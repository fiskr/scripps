function pause(){
	rc=$?
	if [[ $rc != 0 ]]
	  then
	    calcTimeLoss
	    read -p "Press [Enter] to continue, there are build errors above."
	  else
	  	echo $(date +%m" "%_d" "%T" "%Y) > "$LASTBUILD"
	fi
}

function calcTimeLoss(){


	#end time in seconds
	endTime="$(($(date +%s) - $beginningTime))" 

	#save where your current directory is,
	startingDirectory="$(pwd)"
	
	cd ~/cq
	echo "jumping over to $(pwd)"


	#if there are minutes worth of wait
	if [[ $endTime -gt "60" ]]
		then
			minutesWasted="$(($endTime/60))"
			secondsWasted="$(($endTime % 60))"
			if [ $minutesWasted -gt "1" ] && [ $secondsWasted -gt "0" ]
				then
					echo "You wasted $minutesWasted minutes and $secondsWasted seconds waiting for this to build!"
				else
					if [[ $minutesWasted -gt "1" ]]
						then
							echo "You only wasted 1 minute waiting for this to build."
						else
							if [[ $secondsWasted -gt "0" ]]
								then
									echo "You only had to wait $secondsWasted seconds for this to build."
								else
									echo "You didn't even have to wait!"
							fi
					fi

			fi
		else #only seconds were wasted
			secondsWasted="$endTime"
			minutesWasted="0"
			if [[ $secondsWasted -gt "0" ]]
				then
					echo "You only had to wait $secondsWasted seconds for this to build."
				else
					echo "You didn't even have to wait!"
			fi
	fi
	
	#does the file exist
	if [ -f "$TOTALWASTED" ]
		then #the file exists
			totSec="$(cat $TOTALWASTED | awk '{ print $4 }')"
			totMin="$(cat $TOTALWASTED | awk '{ print $3 }')"
			totHr="$(cat $TOTALWASTED | awk '{ print $2 }')"
			totDays="$(cat $TOTALWASTED | awk '{ print $1 }')"
			if [[ $minutesWasted -gt "0" ]] && [[ $secondsWasted -gt "0" ]]
				then #minutes and seconds were wasted
					#if there are hours wasted 
					if [[ $minutesWasted -gt "60" ]]
						then
							hoursWasted="$(($minutesWasted/60))"
							minutesWasted="$(($minutesWasted%60))"
							#if there were days wasted
							if [[ $hoursWasted -gt "24" ]]
								then
									daysWasted="$(($minutesWasted/24))"
									hoursWasted="$(($hoursWasted%24))"
									echo "$daysWasted $hoursWasted $minutesWasted $secondsWasted" > "$TOTALWASTED"
								#only hours were wasted
								else
									echo "$totDays $hoursWasted $minutesWasted $secondsWasted" > "$TOTALWASTED"
							fi
						#only minutes were wasted
						else
							#but did the seconds wasted push into additional minutes?
							secondsWasted="$(($totSec + $secondsWasted))"
							minutesWasted="$(($totMin + $minutesWasted))"
							if [[ $secondsWasted -gt "60" ]]
								then
								minutesWasted="$(($totMin + ($secondsWasted/60)))"
								secondsWasted="$(($secondsWasted%60))"
									#or hours?
									if [[ $minutesWasted -gt "60" ]]
										then
											hoursWasted="$(($totHr + ($minutesWasted/60)))"
											minutesWasted="$(($minutesWasted%60))"
											#or days?
											if [[ $hoursWasted -gt "24" ]]
												then
													daysWasted="$(($totDays + ($hoursWasted/24)))"
													hoursWasted="$(($hoursWasted%60))"
													echo "$daysWasted $hoursWasted $minutesWasted $secondsWasted" > "$TOTALWASTED"
												else
													echo "$totDays $hoursWasted $minutesWasted $secondsWasted" > "$TOTALWASTED"
											fi
										#no additional hours
										else
											echo "$totDays $totHr $minutesWasted $secondsWasted" > "$TOTALWASTED"
									fi
								#no additional minutes
								else
									#only change the seconds
									echo "$totDays $totHr $totMin $secondsWasted" > "$TOTALWASTED"
							fi
					fi
				#only seconds were wasted, not minutes
				else
					#but did the seconds wasted push into additional minutes?
					secondsWasted="$(($totSec + $secondsWasted))"
					if [[ $secondsWasted -gt "60" ]]
						then
						minutesWasted="$(($totMin + ($secondsWasted/60)))"
						secondsWasted="$(($secondsWasted%60))"
							#or hours?
							if [[ $minutesWasted -gt "60" ]]
								then
									hoursWasted="$(($totHr + ($minutesWasted/60)))"
									minutesWasted="$(($minutesWasted%60))"
									#or days?
									if [[ $hoursWasted -gt "24" ]]
										then
											daysWasted="$(($totDays + ($hoursWasted/24)))"
											hoursWasted="$(($hoursWasted%60))"
											echo "$daysWasted $hoursWasted $minutesWasted $secondsWasted" > "$TOTALWASTED"
										else
											echo "$totDays $hoursWasted $minutesWasted $secondsWasted" > "$TOTALWASTED"
									fi
								#no additional hours
								else
									echo "$totDays $totHr $minutesWasted $secondsWasted" > "$TOTALWASTED"
							fi
						#no additional minutes
						else
							#only change the seconds
							echo "$totDays $totHr $totMin $secondsWasted" > "$TOTALWASTED"
					fi
			fi
		else
			#if there are minutes
			if [[ $minutesWasted -gt "0" ]]
				then
					#if there are hours wasted 
					if [[ $minutesWasted -gt "60" ]]
						then
							hoursWasted="$(($minutesWasted/60))"
							minutesWasted="$(($minutesWasted%60))"
							#if there were days wasted
							if [[ $hoursWasted -gt "24" ]]
								then
									daysWasted="$(($minutesWasted/24))"
									hoursWasted="$(($hoursWasted%24))"
									echo "$daysWasted $hoursWasted $minutesWasted $secondsWasted" > "$TOTALWASTED"
								else
									echo "0 $hoursWasted $minutesWasted $secondsWasted" > "$TOTALWASTED"
							fi
						else
							echo "0 0 $minutesWasted $secondsWasted" > "$TOTALWASTED"
					fi
				else
					#only seconds were wasted d hr min sec
					echo "0 0 0 $secondsWasted" > "$TOTALWASTED"
			fi
	fi 

	#tell user how much time they've wasted
	if [ -f "$TOTALWASTED" ]
		then
			message="You have wasted a total of"
			totSec="$(cat $TOTALWASTED | awk '{ print $4 }')"
			totMin="$(cat $TOTALWASTED | awk '{ print $3 }')"
			totHr="$(cat $TOTALWASTED | awk '{ print $2 }')"
			totDays="$(cat $TOTALWASTED | awk '{ print $1 }')"
			if [[ $totSec -gt "1" ]]
				then
					message="$message $totSec seconds"
				else
					if [[ $totSec -eq "1" ]]
						then
							message="$message one second"
						else
							message="$message no time at all!"
					fi
			fi
			if [[ $totMin -gt "1" ]]
				then
					message="$message, $totMin minutes"
				else
					if [[ $totMin -eq "1" ]]
						then
							message="$message, one minute"
					fi
			fi
			if [[ $totHr -gt "1" ]]
				then
					message="$message, $totHr hours"
				else
					if [[ $totHr -eq "1" ]]
						then
							message="$message, one hour"
					fi
			fi
			if [[ $totDays -gt "1" ]]
				then
					message="$message, and $totDays days."
				else
					if [[ totDays -eq "1" ]]
						then
							message="$message, and one day."
						else
							message="$message."
					fi
			fi				
		else
			message="There is no $TOTALWASTED file to keep track of your wasted time."
	fi
	echo "$message"

	#go back to original directory
	cd $startingDirectory
}

function buildIfModified() {
	declare -i month="$(ls -lT $(find . -type f -print0 | xargs -0 stat -f "%m %N" | sort -rn | head -1 | cut -f2- -d" ") | awk '{ print $6}'| while read d ; do date -j -f "%b" "$d" "+%m" ; done)"
	lastUpdate="$month $(ls -lT $(find . -type f -print0 | xargs -0 stat -f "%m %N" | sort -rn | head -1 | cut -f2- -d" ") | awk '{ print $7 " " $8 " " $9}')"
	if [ -f "$LASTBUILD" ]
		then
			#if year is more recent than last build
			if [[ "$(echo "$lastUpdate" | awk '{ print $4 }')" -ge "$(cat $LASTBUILD | awk '{ print $4 }')" ]]
				then
					#if month more recent
					if [ "$(echo "$lastUpdate" | awk '{ print $1 }')" -ge "$(cat $LASTBUILD | awk '{ print $1 }')" ]
						then
							#day
							if [ "$(echo "$lastUpdate" | awk '{ print $2 }')" -ge "$(cat $LASTBUILD | awk '{ print $2 }')" ]
								then
									#hour
									if [ "$(echo "$lastUpdate" | awk ' { split($3, array, ":" )} END{ print array[1]} ')" -ge "$(cat $LASTBUILD | awk ' { split($3, array, ":" )} END{ print array[1]} ')" ]
										then
											#minutes
											if [ "$(echo "$lastUpdate" | awk ' { split($3, array, ":" )} END{ print array[2]} ')" -ge "$(cat $LASTBUILD | awk ' { split($3, array, ":" )} END{ print array[2]} ')" ]
												then
													#seconds
													if [ "$(echo "$lastUpdate" | awk ' { split($3, array, ":" )} END{ print array[3]} ')" -ge "$(cat $LASTBUILD | awk ' { split($3, array, ":" )} END{ print array[3]} ')" ]
														then
															echo "Building ${PWD##*/}"
															eval $1
															pause

														else
															secDiff="$(( $(cat $LASTBUILD | awk ' { split($3, array, ":" )} END{ print array[3]} ') - $(echo "$lastUpdate" | awk ' { split($3, array, ":" )} END{ print array[3]} ')))"
															if [[ $secDiff -gt "1" ]]
																then
																	echo "Skipping build. The last build was run $secDiff seconds after the last update."
																else
																	echo "Skipping build. The last build was run one second after the last update."
															fi
													fi
												else
													minDiff="$(($(cat $LASTBUILD | awk ' { split($3, array, ":" )} END{ print array[2]} ') - $(echo "$lastUpdate" | awk ' { split($3, array, ":" )} END{ print array[2]} ')))"
													if [[ $minDiff -gt "1" ]]
														then
															echo "Skipping build. The last build was run $minDiff minutes after the last update."
														else
															echo "Skipping build. The last build was run one minute after the last update."
													fi
													
											fi
										else
											hourDiff="$(($(cat $LASTBUILD | awk ' { split($3, array, ":" )} END{ print array[1]} ') - $(echo "$lastUpdate" | awk ' { split($3, array, ":" )} END{ print array[1]} ')))"
											if [[ $hourDiff -gt "1" ]]
												then
													echo "Skipping build. The last build was run $hourDiff hours after the last update."
												else
													echo "Skipping build. The last build was run one hour after the last update."
											fi
									fi
								else
									dayDiff="$(( $(cat $LASTBUILD | awk '{ print $2 }') - $(echo "$lastUpdate" | awk '{ print $2 }') ))"
									if [[ $dayDiff -gt "1" ]]
										then
											echo "Skipping build. The last build was run $dayDiff days after the last update."
										else
											echo "Skipping build. The last build was run one day after the last update."
									fi
							fi
						else
							monthDiff="$(($(cat $LASTBUILD | awk '{ print $1 }') - $(echo "$lastUpdate" | awk '{ print $1 }') ))"
							if [[ $monthDiff -gt "1" ]]
								then
									echo "Skipping build. The last build was run $monthDiff months after the last update."
								else
									echo "Skipping build. The last build was run one month after the last update."
							fi
					fi
				else
					yrDiff="$(($(cat $LASTBUILD | awk '{ print $4 }') - $(echo "$lastUpdate" | awk '{ print $4 }')))"
					if [[ $yrDiff -gt "1" ]]
						then
							echo "Skipping build. The last build was run $yrDiff years after the last update."
						else
							echo "Skipping build. The last build was run one year after the last update."
					fi
			fi
		else
			echo "You don't have a lastBuild file. Running first build on ${PWD##*/}."
			eval $1
			pause
	fi

}

#name of file that keeps a running total of time spent building
#days hours minutes seconds
TOTALWASTED="./.totalWasted.dat"
#filename that keeps the last time the directory was built
LASTBUILD="./.lastBuild.dat"

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