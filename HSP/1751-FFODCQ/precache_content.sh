#!/usr/bin/bash


case $(hostname) in
        snokvuq70)
                docroot="/opt/local/vignette/staging_docs"
                modbase="/food/cda/endeca"
                webserver="http://staging.scrippsnetworks.com"
                logdir="/opt/ff-sched/scripts/logs"
                processes=8
                timeout=30
                ;;
	snokhup47)
		docroot="/opt/local/vignette/prod01_docs"
		modbase="/food/cda/endeca"
		webserver="http://vgnflush01.scrippsnetworks.com"
		logdir="/opt/ff-sched/scripts/logs"
		processes=8
		timeout=30
		;;
	snokvup48)
		docroot="/opt/local/vignette/prod02_docs"
		modbase="/food/cda/endeca"
		webserver="http://vgnflush02.scrippsnetworks.com"
		logdir="/opt/ff-sched/scripts/logs"
		processes=8
		timeout=30
		;;
	snokvup49)
		docroot="/opt/local/vignette/prod03_docs"
		modbase="/hgtv/cda/endeca"
		webserver="http://vgnflush03.scrippsnetworks.com"
		logdir="/opt/ff-sched/scripts/logs"
		processes=8
		timeout=30
		;;
	snokhup50)
		docroot="/opt/local/vignette/prod04_docs"
		modbase="/hgtv/cda/endeca"
		webserver="http://vgnflush04.scrippsnetworks.com"
		logdir="/opt/ff-sched/scripts/logs"
		processes=8
		timeout=30
		;;
	*)
		exit 1
		;;
esac

function doRequest {
	local child_number=$1
	local logfile=$2
	local filelist=$3
	local processes=$4
	local sleep=$5
	local date="$(date "+%m-%d-%Y")";

	echo "child $child_number starting $(date "+%H:%M:%S")">>$logfile

	local success=0
	local failure=0
	local exit_status
	while read file; do
		local tmp_file=$(dirname $file)/temp/$(basename $file)
		local tmp_url=${webserver}${tmp_file#$docroot}
		[ -f $tmp_file ] && rm -f $tmp_file
		echo -n "`date '+%H:%M:%S'` " 
		/opt/sfw/bin/curl -m $timeout -w "%{http_code} %{time_total} " -f -o /dev/null -s "$tmp_url"
		exit_status=$?
		if [ $exit_status -eq 0 ] && [ -f $tmp_file ]; then
			mv $tmp_file $file
			echo "success $file $exit_status"
			((success++))
		else
			echo "failure $file $exit_status"
			((failure++))
		fi
		[ $sleep -gt 0 ] && sleep $sleep
	done< <(awk "(NR % $processes) == $child_number" $filelist) > ${logfile}.${child_number}

	echo "child $child_number finished $(date "+%H:%M:%S") ${success}/${failure}">>$logfile
}


# don't run if we're already running
# Lockfile is created read only, but subsequent writes fail.
lockfile="/tmp/lock.$(basename ${0})"
if ! (umask 222; echo $$>$lockfile) 2>/dev/null; then
	echo "lockfile $lockfile present, skipping..."
	exit 1;
fi

logfile=${logdir}/$(basename ${0})_$(date "+%m-%d-%Y").log

echo "start recache $(date "+%H:%M:%S")">$logfile

if [ $# -eq 0 ]; then
	echo "please provide file list"
	exit 1;
fi

if [ -n $1 ]; then
	filelist=$1
else
	echo "must provide filename with absolute urls"
	exit
fi

if [ "$2" -gt 0 2>/dev/null ]; then
	sleep="$2"
else
	sleep=0
fi

for child in $(seq 0 $((processes - 1))); do
	doRequest $child $logfile $filelist $processes $sleep &
done;

# we'll wait for children so we can undo the lock
wait

echo "end recache $(date "+%H:%M:%S")">>$logfile

rm -f $lockfile
