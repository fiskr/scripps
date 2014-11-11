# full-rebuild.sh, version 2
# purpose: rebuilds your HGTV projects (including SNI-foundation),
# 	tells you how much time you have wasted waiting for a build,
#	and only builds what has been changed ( and needs building )
# author: Brandon Foster
# date: November 10, 2014

function pause(){
	rc=$?
	if [[ $rc != 0 ]]
	  then
	    calcTimeLoss
	    read -p "Press [Enter] to continue, there are build errors above."
	  else
	  	echo $(date +%s) > "$LASTBUILD"
	fi
}

function calcTimeLoss(){


	#end time in seconds
	endTime="$(($(date +%s) - $beginningTime))" 

	#save where your current directory is,
	startingDirectory="$(pwd)"
	
	cd ~/cq

	#tell user how much time they've wasted

	#does the file exist to keep track of time wasted
	if [ -f "$TOTALWASTED" ]
		then
			message="You have wasted a total of"
			totalWasted="$(cat $TOTALWASTED)"
			#getting new total seconds
			secondsWasted="$(($totalWasted + $endTime))"
			#update the total time wasted
			echo "$secondsWasted" > $TOTALWASTED
			if [[ $secondsWasted -gt "60" ]]
				then
				minutesWasted="$(($secondsWasted/60))"
				secondsWasted="$(($secondsWasted%60))"
					#or hours?
					if [[ $minutesWasted -gt "60" ]]
						then
							hoursWasted="$(($minutesWasted/60))"
							minutesWasted="$(($minutesWasted%60))"
							#or days?
							if [[ $hoursWasted -gt "24" ]]
								then
									daysWasted="$(($hoursWasted/24))"
									hoursWasted="$(($hoursWasted%24))"
									message="$$message secondsWasted seconds, $minutesWasted minutes, $hoursWasted hours, and $daysWasted days."
								else
									message="$$message secondsWasted seconds, $minutesWasted minutes, and $hoursWasted hours."
							fi
						#no additional hours
						else
							message="$message $secondsWasted seconds and $minutesWasted minutes."
					fi
				#no additional minutes
				else
					message="$message $secondsWasted seconds."
			fi
		else
			message="There is no $TOTALWASTED file to keep track of your wasted time."
			#make the total wasted file and put the current end time in there
			echo "$endTime" > $TOTALWASTED
	fi
	echo "$message"

	#go back to original directory
	cd $startingDirectory
}

function buildIfModified() {
	lastUpdate="$(stat -l -t '%s' $(find . -name '.lastBuild.dat' -prune -o -type f -print0 | xargs -0 stat -f "%m %N" | sort -rn | head -1 | cut -f2- -d" ") | awk '{ print $6 }')"
	echo "lastUpdate: $lastUpdate"
	if [ -f "$LASTBUILD" ]
		then
			lastBuild="$(cat $LASTBUILD)"
			echo "lastBuild exists: $lastBuild"
			if [[ $lastUpdate -gt $lastBuild ]]
				then
					echo "Building ${PWD##*/}"
					eval $1
					#gotta have that pause to update the lastBuild file
					pause
				else
					echo "Skipping build. The last build was run  after the last update."
			fi					
		else
			echo "You don't have a lastBuild file. Running first build on ${PWD##*/}."
			eval $1
			#gotta have that pause to update the lastBuild file
			pause
	fi

}

#name of file that keeps a running total of time spent building
#days hours minutes seconds
TOTALWASTED="./.totalWasted.dat"
#filename that keeps the last time the directory was built
LASTBUILD=".lastBuild.dat"

#start time in seconds
beginningTime="$(date +%s)"

echo "Build SNI-FOUNDATION?"
cd ~/cq/sni-foundation
buildIfModified "mvn clean install -P auto-deploy-all"

echo "Build SNI-FOUNDATION DEPENDENCIES?"
cd ~/cq/sni-foundation/sni-foundation-dependencies
buildIfModified "mvn clean install -P auto-deploy-dependencies"

echo "Build SNI-FOUNDATION CONTENT?"
cd ~/cq/sni-foundation/sni-foundation-content
buildIfModified "mvn clean install -P auto-deploy"

echo "Build HOME-HGTV-COM?"
cd ~/cq/home-hgtv-com
buildIfModified "mvn clean install -P auto-deploy-all"

echo "Build HOME-HGTV-COM CONTENT?"
cd ~/cq/home-hgtv-com/hgtvcom-content
buildIfModified "mvn clean install -P auto-deploy"

calcTimeLoss