/*
Scans event titles for a specific keywords and changes the event attributes
*/

function myFunction() {
 
  let calName = "Work"; //The name of the calendar to modify
  daysBackwards = 2; daysForward = 10; // The date range for scanning for events whenever the script runs

/*
- prefix - case insensitive. Searches in the beginning of the event title
- colorId - 1:blue, 2:green, 3:purple, 4:red, 5:yellow, 6:orange, 7:torquise, 8:gray, 9:bold blue
- visibility - "private" or "public" (or remove to keep default)
- reminders - false to remove default. Manual reminders will not be removed
*/
  let rules = [
    {
      "prefix":"*",
      "colorId":8,
      "reminders":false,
    },
    {
      "prefix":"f:",
      "colorId":7,
      "visibility":"private",
      "reminders":false,
    },
  ]


  let calId = CalendarApp.getCalendarsByName(calName)[0].getId();
  
  let startDate = new Date();
  startDate.setDate(startDate.getDate() - daysBackwards);
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + daysForward);

  let optionalArgs = {
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime'
  };
  
  let service = Calendar.Events;
  let response = Calendar.Events.list(calId, optionalArgs);
  let events = response.items;

  for (let v = 0; v < events.length; v++) {    

    for (let r=0; r < rules.length; r++){

      if (events[v].summary.toLowerCase().indexOf(rules[r].prefix.toLowerCase()) == 0){

        Logger.log(events[v].summary);
        if (rules[r].colorId!=undefined)      events[v].colorId =               rules[r].colorId; //turquoise
        if (rules[r].reminders!=undefined)    events[v].reminders.useDefault =  rules[r].reminders;
        if (rules[r].visibility!=undefined)   events[v].visibility =            rules[r].visibility;
        
        try{  
          service.update(events[v], calId, events[v].id);
        }
        catch(e){
          Logger.log(e);
        }
      }

    }
    
  }
}
