#!/bin/bash

function get_program_state {
  instances=$(pgrep caffeinate)

  # set state
  if [ -z $instances ]; then
    state="stopped";
    icon="💤";
  else
    state="running";
    icon="☕️";
  fi
}

function kill_caffeinate {
  killall caffeinate 2&>/dev/null;
}

if [[ "$1" = "start" ]]; then
  kill_caffeinate;
  caffeinate -di &
  exit;
fi

if [[ "$1" = "stop" ]]; then
  kill_caffeinate;
  exit;
fi

get_program_state;

echo "[$icon]"
echo "---"
echo "program state: ${state}"
echo "---"
echo "Start caffeinate | bash='$0' param1=start terminal=false refresh=true"
echo "Stop caffeinate | bash='$0' param1=stop terminal=false refresh=true"
