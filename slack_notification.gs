function postSlackMessage() {
    var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
    var slackApp = SlackApp.create(token);
    var Cal_id = "~~~";
    var date_start = new Date();
    var date_end = new Date;
    date_end.setTime(date_start.getTime() + 24*60*60*1000);  
    var Cal = CalendarApp.getCalendarById(Cal_id); 
    var ToDoList = Cal.getEvents(date_start,date_end); 

    var options = {
channelId: "#general",
	   userName: "bot",
	   message: "今日も1日頑張ろう."
    };
    slackApp.postMessage(options.channelId, options.message, {username: options.userName});  

    var Message;
    for(var i = 0; i < ToDoList.length;i++){ 
	if(ToDoList[i].isAllDayEvent()){
	    Message ="ToDo" + (i+1) + ":" + ToDoList[i].getTitle() + "\n" + "Time:" + ToDoList[i].getStartTime();
	    Message = Message.replace("00:00:00 GMT+0900 (JST)"," ");
	}else{
	    Message ="ToDo" + (i+1) + ":" + ToDoList[i].getTitle() + "\n" + "Time:" + ToDoList[i].getStartTime() + "〜" + ToDoList[i].getEndTime();
	    Message = Message.replace(/GMT\+0900 \(JST\)/g,"");
	} 
	var options = {
channelId: "#general",
	   userName: "bot",
	   message: Message
	};
	slackApp.postMessage(options.channelId, options.message, {username: options.userName});
    }
}
