/* =====================
   一刻表达 V1.0
   主程序
===================== */


/* 全局变量 */

let score = 0;

let timer = null;

let practiceSeconds = 0;



/* =====================
   页面初始化
===================== */


window.onload = function(){


    setDate();


    loadTopic();


    loadHistory();


    updateGrowth();


    updateAchievements();


    updateStreak();


    updateChallenge();


    checkPracticeStatus();


    loadPodcast();


    drawScoreChart();


};




/* =====================
   日期系统
===================== */


function setDate(){


    let dateBox =
    document.getElementById("date");



    if(!dateBox){

        return;

    }



    let today =
    new Date();



    dateBox.innerHTML =

    today.getFullYear()
    +
    "年"
    +
    (today.getMonth()+1)
    +
    "月"
    +
    today.getDate()
    +
    "日";


}





/* =====================
   今日表达话题
===================== */


let topics = [

"介绍一次让你印象深刻的经历",

"如果可以给三年前的自己一句建议，你会说什么？",

"分享一次你克服困难的经历",

"你最近学到的一个重要道理是什么？",

"介绍一个你喜欢的人或者作品",

"如果有一天不用考虑金钱，你想做什么？",

"最近一次让你感到自豪的事情是什么？",

"介绍一个你最近养成的好习惯",

"如果向陌生人介绍自己，你会怎么介绍？",

"你认为优秀的人应该具备哪些品质？",

"分享一次失败后的反思经历",

"最近有没有一件小事改变了你的想法？",

"你怎么看待失败？",

"如果给未来五年的自己写一段话，你会说什么？",

"你认为朋友之间最重要的是什么？"

];




function loadTopic(){


    let topicBox =
    document.getElementById("topic");



    if(!topicBox){

        return;

    }



    let today =
    new Date().toDateString();



    let savedDate =
    localStorage.getItem(
        "topicDate"
    );



    let savedTopic =
    localStorage.getItem(
        "dailyTopic"
    );



    if(
    savedDate === today
    &&
    savedTopic
    ){


        topicBox.innerHTML =
        savedTopic;


    }else{


        let newTopic =

        topics[
        Math.floor(
        Math.random()*topics.length
        )
        ];



        localStorage.setItem(
            "dailyTopic",
            newTopic
        );



        localStorage.setItem(
            "topicDate",
            today
        );



        topicBox.innerHTML =
        newTopic;


    }


}






/* =====================
   一分钟表达训练
===================== */


function startPractice(){


    let timerBox =
    document.getElementById("timer");



    let status =
    document.getElementById(
        "practice-status"
    );



    if(!timerBox){

        return;

    }



    let timeLeft = 60;



    practiceSeconds = 0;



    if(status){


        status.innerHTML =
        "🎤 正在练习...";


    }



    clearInterval(timer);



    timer = setInterval(function(){



        timeLeft--;


        practiceSeconds++;



        let minutes =
        Math.floor(
            timeLeft/60
        );



        let seconds =
        timeLeft%60;



        if(seconds < 10){

            seconds =
            "0"+seconds;

        }



        timerBox.innerHTML =

        "0"
        +
        minutes
        +
        ":"
        +
        seconds;




        if(timeLeft<=0){



            clearInterval(timer);



            if(status){


                status.innerHTML =
                "✅ 今日训练完成！";


            }



            localStorage.setItem(

                "practiceDate",

                new Date().toDateString()

            );



            alert(
            "🎉 今日一分钟表达完成！"
            );



        }



    },1000);



}






/* =====================
   今日完成状态
===================== */


function checkPracticeStatus(){


    let status =
    document.getElementById(
        "practice-status"
    );



    if(!status){

        return;

    }



    let saved =
    localStorage.getItem(
        "practiceDate"
    );



    let today =
    new Date().toDateString();



    if(saved===today){


        status.innerHTML =
        "🎉 今日训练完成！";


    }else{


        status.innerHTML =
        "🎯 今天还没有完成一分钟表达";


    }


}



/* =====================
   评分系统
===================== */


function rate(number){


    score = number;



    let scoreBox =
    document.getElementById(
        "score"
    );



    if(scoreBox){


        scoreBox.innerHTML =
        "今天表达状态：" 
        +
        number
        +
        "分";


    }


}






/* =====================
   保存记录
===================== */


function saveRecord(){


    let feelingBox =
    document.getElementById(
        "feeling"
    );



    if(!feelingBox){

        return;

    }



    let dateBox =
    document.getElementById(
        "date"
    );



    let record = {


        date:
        dateBox
        ?
        dateBox.innerHTML
        :
        "",


        score:score,


        feeling:
        feelingBox.value


    };



    let records =

    JSON.parse(

        localStorage.getItem(
            "records"
        )

    )
    ||
    [];



    records.push(record);



    localStorage.setItem(

        "records",

        JSON.stringify(records)

    );



    alert(
    "保存成功！"
    );



    loadHistory();


    updateGrowth();


    updateAchievements();


    updateStreak();


    updateChallenge();



}






/* =====================
   历史记录
===================== */


function loadHistory(){


    let historyBox =
    document.getElementById(
        "history"
    );



    if(!historyBox){

        return;

    }



    let records =

    JSON.parse(

        localStorage.getItem(
            "records"
        )

    )
    ||
    [];



    if(records.length===0){


        historyBox.innerHTML =
        "暂无记录";


        return;


    }



    let html="";



    records.forEach(
    function(item,index){



        html +=


        "第 "
        +
        (index+1)
        +
        " 次表达"
        +
        "<br>"
        +


        "日期："
        +
        item.date
        +
        "<br>"
        +


        "评分："
        +
        item.score
        +
        "分"
        +
        "<br>"
        +


        "感受："
        +
        item.feeling
        +
        "<br><br>";



    });



    historyBox.innerHTML =
    html;



}






/* =====================
   训练统计
===================== */


function updateStreak(){


    let records =

    JSON.parse(

        localStorage.getItem(
            "records"
        )

    )
    ||
    [];



    let streakBox =
    document.getElementById(
        "streak"
    );



    let totalBox =
    document.getElementById(
        "total-days"
    );



    if(streakBox){


        streakBox.innerHTML =
        records.length
        +
        "天";


    }



    if(totalBox){


        totalBox.innerHTML =
        records.length
        +
        "天";


    }


}







/* =====================
   表达成长
===================== */


function updateGrowth(){


    let records =

    JSON.parse(

        localStorage.getItem(
            "records"
        )

    )
    ||
    [];



    let total =
    document.getElementById(
        "total-practice"
    );



    let average =
    document.getElementById(
        "average-score"
    );



    let level =
    document.getElementById(
        "growth-level"
    );



    if(total){


        total.innerHTML =
        "累计训练："
        +
        records.length
        +
        "次";


    }



    if(records.length===0){


        if(average){

            average.innerHTML =
            "平均评分：暂无";

        }



        if(level){

            level.innerHTML =
            "🌱 开始第一次表达吧";

        }



        return;


    }




    let sum=0;



    records.forEach(
    function(item){


        sum +=
        Number(item.score);


    });



    let avg =
    (sum/records.length)
    .toFixed(1);



    if(average){


        average.innerHTML =
        "平均评分："
        +
        avg
        +
        "分";


    }




    if(level){



        if(avg>=8){


            level.innerHTML =
            "🔥 流畅表达者";


        }else if(avg>=6){


            level.innerHTML =
            "🌱 稳定表达者";


        }else{


            level.innerHTML =
            "💪 表达练习者";


        }


    }


}







/* =====================
   成就系统
===================== */


function updateAchievements(){


    let box =
    document.getElementById(
        "achievements"
    );



    if(!box){

        return;

    }



    let records =

    JSON.parse(

        localStorage.getItem(
            "records"
        )

    )
    ||
    [];



    let html="";



    if(records.length>=1){


        html +=
        "<span class='badge'>🌱 初次表达</span>";


    }



    if(records.length>=7){


        html +=
        "<span class='badge'>🔥 坚持一周</span>";


    }



    if(records.length>=30){


        html +=
        "<span class='badge'>🏆 30天挑战者</span>";


    }



    box.innerHTML =
    html;


}







/* =====================
   30天表达挑战
===================== */


function updateChallenge(){


    let records =

    JSON.parse(

        localStorage.getItem(
            "records"
        )

    )
    ||
    [];



    let days =
    records.length;



    if(days>30){

        days=30;

    }



    let text =
    document.getElementById(
        "challenge-text"
    );



    let bar =
    document.getElementById(
        "progress-bar"
    );



    if(text){


        text.innerHTML =
        "已完成："
        +
        days
        +
        " / 30 天";


    }



    if(bar){


        bar.style.width =
        (
        days/30*100
        )
        +
        "%";


    }



}



/* =====================
   🎧 播客学习系统
===================== */


function finishPodcast(){


let today =
new Date().toDateString();



localStorage.setItem(

"podcastDate",

today

);



let status =
document.getElementById(
"podcastStatus"
);



if(status){


status.innerHTML =

"🎉 今日播客学习完成！";


}



}





function loadPodcast(){


let status =
document.getElementById(
"podcastStatus"
);



if(!status){

return;

}



let saved =

localStorage.getItem(
"podcastDate"
);



let today =

new Date().toDateString();





if(saved===today){


status.innerHTML =

"🎉 今日播客学习完成！";


}else{


status.innerHTML =

"今日学习状态：未完成";


}



}







/* =====================
   🤖 AI表达点评
===================== */


function analyzeExpression(){


    let textBox =
    document.getElementById(
        "feeling"
    );



    let feedback =
    document.getElementById(
        "ai-feedback"
    );



    if(!textBox || !feedback){

        return;

    }



    let text =
    textBox.value.trim();



    if(text===""){


        feedback.innerHTML =
        "请先记录今天的表达内容哦～";


        return;


    }




    let result =
    "";



    result +=
    "✨ 表达亮点：<br>";



    if(text.length>=30){


        result +=
        "你的表达内容比较完整，已经有一定信息量。👍<br><br>";


    }else{


        result +=
        "你已经开始记录表达过程，坚持比完美更重要。👍<br><br>";


    }




    result +=
    "🧠 结构分析：<br>";



    if(
    text.includes("因为")
    ||
    text.includes("所以")
    ||
    text.includes("但是")
    ){


        result +=
        "你开始使用逻辑连接词，表达结构更清晰。<br><br>";


    }else{


        result +=
        "建议尝试：事情 → 原因 → 感受 → 总结。<br><br>";


    }




    result +=
    "🌱 提升建议：<br>";



    result +=
    "加入具体人物、时间和例子，会让表达更加生动。";



    feedback.innerHTML =
    result;


}







/* =====================
   📈 表达趋势图
===================== */


function drawScoreChart(){


    let canvas =
    document.getElementById(
        "score-chart"
    );



    if(!canvas){

        return;

    }



    let ctx =
    canvas.getContext("2d");



    let records =

    JSON.parse(

        localStorage.getItem(
            "records"
        )

    )
    ||
    [];



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    if(records.length<2){


        ctx.font =
        "16px Arial";



        ctx.fillText(
        "完成更多训练后显示趋势",
        30,
        100
        );


        return;


    }




    ctx.beginPath();



    records.forEach(
    function(item,index){



        let x =
        40 + index*50;



        let y =
        canvas.height -
        Number(item.score)*20;



        if(index===0){


            ctx.moveTo(
            x,
            y
            );


        }else{


            ctx.lineTo(
            x,
            y
            );


        }



    });



    ctx.stroke();



}







/* =====================
   🎤 语音训练
===================== */


let recognition = null;


let spokenText = "";




function startVoice(){


    let SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;



    if(!SpeechRecognition){


        alert(
        "你的浏览器暂不支持语音识别，请使用Chrome"
        );


        return;


    }



    recognition =
    new SpeechRecognition();



    recognition.lang =
    "zh-CN";



    recognition.continuous =
    true;



    recognition.interimResults =
    true;



    spokenText="";



    recognition.onresult =
    function(event){



        let text="";



        for(
        let i=event.resultIndex;
        i<event.results.length;
        i++
        ){


            text +=
            event.results[i][0].transcript;


        }



        spokenText =
        text;



        let count =
        document.getElementById(
            "word-count"
        );



        if(count){


            count.innerHTML =
            "已表达字数："
            +
            spokenText.length;


        }



    };



    recognition.start();



    let status =
    document.getElementById(
        "voice-status"
    );



    if(status){


        status.innerHTML =
        "🎤 正在聆听...";


    }


}





function stopVoice(){


    if(recognition){


        recognition.stop();


    }



    let status =
    document.getElementById(
        "voice-status"
    );



    if(status){


        status.innerHTML =
        "🎉 表达结束";


    }


}


/* =====================
🌱 AI成长记忆系统
===================== */


function getAIMemory(){



let records =

JSON.parse(

localStorage.getItem("records")

)

||

[];




let memory = {

total:records.length,

average:0,

last:"",

problem:""



};





if(records.length>0){



let sum=0;



records.forEach(function(item){


sum += Number(item.score);


});



memory.average =

(sum/records.length).toFixed(1);




memory.last =

records[records.length-1].feeling;



}






// 判断薄弱点


if(memory.average<6){


memory.problem="表达基础需要加强";


}


else if(memory.average<8){


memory.problem="逻辑和细节表达可以提升";


}


else{


memory.problem="可以挑战高级表达";


}





return memory;



}




/* =====================
🧠💬 一刻AI助手 V2.0
===================== */


function openAI(){


let box =
document.getElementById("ai-box");



if(!box){

return;

}



if(box.style.display==="block"){


box.style.display="none";


}else{


box.style.display="block";


}



}





function askAI(){



let input =
document.getElementById("ai-input");


let content =
document.getElementById("ai-content");



if(!input || !content){

return;

}




let question =
input.value.trim();




if(question===""){


return;


}




let answer="";


let memory =
getAIMemory();



// 认知库智能匹配


for(let i=0;i<knowledgeData.length;i++){


if(
question.includes(
knowledgeData[i].question.substring(0,4)
)

){


answer =
"🧠 根据认知库：<br><br>"
+
knowledgeData[i].answer;


break;


}


}



// 获取训练数据


let records =

JSON.parse(

localStorage.getItem("records")

)

||

[];




let total =
records.length;



let average = 0;



if(total>0){


let sum=0;



records.forEach(function(item){


sum += Number(item.score);


});



average =
(sum/total).toFixed(1);


}







/* 表达紧张 */


if(

question.includes("紧张")

||
question.includes("害怕")

||
question.includes("不敢")

||
question.includes("怯场")

){


answer=

`
🎤 关于表达紧张：

紧张不是因为你不会表达，
而是大脑同时处理：

① 想内容

② 担心别人评价

③ 组织语言


解决方法：

每天一分钟表达训练。

开始时不要追求完美，

先训练：

敢说 → 说清楚 → 说精彩。


🌱 小练习：

现在尝试说：

“今天发生的一件小事。”

连续说60秒即可。
`;

}







/* 逻辑表达 */


else if(

question.includes("逻辑")

||
question.includes("条理")

||
question.includes("清晰")

||
question.includes("重点")

){


answer=

`
🧠 提升逻辑表达：

推荐万能结构：

① 先说观点

② 解释原因

③ 举一个例子

④ 总结观点


例如：

“我认为运动很重要，

因为它能提升状态，

比如我坚持跑步后，

精神更好了。”


表达不是想到什么说什么，

而是建立结构。
`;

}








/* 故事 */


else if(

question.includes("故事")

||
question.includes("经历")

||
question.includes("讲故事")

){


answer=

`
📖 讲好故事：

使用：

背景
↓

困难
↓

行动
↓

结果
↓

感悟


别人喜欢听故事，

不是因为事情多精彩，

而是因为能看到你的成长。
`;

}







/* 焦虑 */


else if(

question.includes("焦虑")

||
question.includes("迷茫")

||
question.includes("压力")

){


answer=

`
🌱 关于焦虑：

很多焦虑来自：

“想改变，但是不知道下一步做什么。”


建议：

不要想着一次解决所有问题。


每天完成一个小行动：

🎤 一分钟表达

📖 阅读10分钟

📝 写下一个想法


小行动会带来掌控感。
`;

}







/* 自信 */


else if(

question.includes("自信")

||
question.includes("自卑")

||
question.includes("相信自己")

){


answer=

`
✨ 提升自信：

自信不是想出来的，

而是一次次完成事情产生的。


表达训练也是如此：

第一次：
敢开口。


第十次：
更自然。


第一百次：
形成能力。


行动会创造自信。
`;

}







/* 拖延 */


else if(

question.includes("拖延")

||
question.includes("懒")

){


answer=

`
⏰ 关于拖延：

很多时候不是懒，

而是任务太大。


尝试：

把目标缩小。


不要：

“我要提升表达能力。”


改成：

“今天说一分钟。”


降低开始难度，
行动自然会增加。
`;

}







/* 训练 */


else if(

question.includes("训练")

||
question.includes("练习")

||
question.includes("今天练什么")

){


answer=

`
🎯 今日表达训练：

主题：

“最近让我改变的一件事”


结构：

1. 发生了什么？

2. 我的感受？

3. 我学到了什么？


完成一分钟即可。

`;

}








/* AI个人成长分析 */


else if(

question.includes("我的情况")

||

question.includes("水平")

||

question.includes("成长")

||

question.includes("怎么样")

){



let memory =
getAIMemory();



answer=

`
🌱 一刻AI个人分析：

🎯 累计训练：

${memory.total} 次


⭐ 平均评分：

${memory.total>0 
?
memory.average+"分"
:
"暂无数据"
}



📌 当前阶段：

${memory.problem}


`;




if(memory.total===0){


answer+=

`
<br>

你还没有开始训练。

建议：

完成第一次一分钟表达。
`;


}

else{


answer+=

`
<br>

最近一次表达：

${memory.last}


<br><br>

下一步建议：

保持每天输出，

逐渐增加：

细节

逻辑

情绪表达。


`;

}



}







/* 默认 */


else if(answer===""){


answer=
`
🌱 我暂时没有找到对应知识。

你可以继续问：

🎤 表达训练

🧠 逻辑表达

✨ 自信提升

📖 故事表达

我也会不断学习你的认知库内容。
`;

}





// 追加聊天内容


content.innerHTML +=


`

<br><br>

<div>

<b>你：</b>

${question}

</div>


<div>

<b>🧠 一刻AI：</b>

<br>

${answer}

</div>


`;





// 自动滚动到底部


content.scrollTop =
content.scrollHeight;




input.value="";



}




/* =====================
🎯 首页智能计划系统
===================== */



function updateHomeSmart(){



let taskBox =

document.getElementById(
"today-task"
);



let growthBox =

document.getElementById(
"home-growth"
);



let adviceBox =

document.getElementById(
"ai-daily-advice"
);




if(
!taskBox &&
!growthBox &&
!adviceBox
){

return;

}




let records =

JSON.parse(

localStorage.getItem("records")

)
||
[];





let total = records.length;



let average = 0;



if(total>0){


let sum = 0;



records.forEach(function(item){


sum += Number(item.score);


});



average =

(sum/total).toFixed(1);


}






/* 今日任务 */


if(taskBox){


taskBox.innerHTML =


`
<span class="task-item">

🎤 一分钟表达训练

</span>


<span class="task-item">

🎧 完成一次播客输入

</span>


<span class="task-item">

📝 记录今日表达感受

</span>
`;

}





/* 成长数据 */


if(growthBox){


growthBox.innerHTML =


`
🎯 累计训练：
${total} 次

<br>

⭐ 平均评分：
${total>0 ? average+"分":"暂无"}

<br>

🌱 当前状态：
${getGrowthStatus(total,average)}

`;

}





/* AI建议 */


if(adviceBox){



if(total==0){


adviceBox.innerHTML =

`
欢迎开始你的表达训练 🌱

今天建议：

完成第一次一分钟表达。

主题：

“介绍一次最近的成长经历”
`;



}


else if(average>=8){



adviceBox.innerHTML =

`
你的表达状态很好！🔥

建议继续：

✨ 提升故事感染力

✨ 加入更多细节

✨ 形成个人表达风格

`;



}



else if(average>=6){



adviceBox.innerHTML =

`
你的表达正在稳定成长 🌱

今天建议：

加强逻辑结构训练。

尝试：

观点 → 原因 → 例子 → 总结

`;



}


else{


adviceBox.innerHTML =

`
现在最重要的是保持输出 💪

不要追求完美。

每天一分钟表达，
会让你越来越自然。

`;



}



}



}






function getGrowthStatus(total,average){



if(total==0){


return "🌱 刚刚开始";


}


if(average>=8){


return "🔥 流畅表达者";


}


if(average>=6){


return "🌱 稳定进步中";


}


return "💪 训练提升阶段";



}





// 页面加载执行


updateHomeSmart();


/* =====================
👋 首页欢迎状态
===================== */


function updateWelcome(){



let box =

document.getElementById(
"welcome-message"
);



if(!box){

return;

}



let records =

JSON.parse(

localStorage.getItem("records")

)
||
[];




let count = records.length;




if(count==0){


box.innerHTML =

`
🌱 今天开始你的第一次表达训练吧。


完成一分钟表达，
你的成长之路就开始了。
`;



}


else if(count<7){


box.innerHTML =

`
🎯 你已经完成 ${count} 次训练。


继续保持，
建立表达习惯。
`;



}


else if(count<30){


box.innerHTML =

`
🔥 你已经坚持 ${count} 次表达训练。


正在逐渐形成自己的表达能力。
`;



}



else{


box.innerHTML =

`
🏆 你已经完成30次以上训练！


你正在成为稳定表达者。
`;



}



}



updateWelcome();


/* =====================
🌱 AI主动成长提醒
===================== */


function updateAIWelcome(){


let box =

document.getElementById(
"ai-welcome"
);



if(!box){

return;

}



let records =

JSON.parse(

localStorage.getItem("records")

)
||
[];




let count = records.length;



let message="";




if(count===0){


message=

`
👋 欢迎开始一刻表达。


今天完成第一次一分钟表达训练，

你的成长就开始了 🌱
`;



}

else if(count<7){


message=

`
🎯 你已经完成 ${count} 次训练。


现在最重要的是：

保持每天表达习惯。

`;



}

else if(count<30){


message=

`
🔥 很棒！

你已经坚持 ${count} 次表达训练。


今天建议：

练习故事表达，让内容更有感染力。

`;



}

else{


message=

`
🏆 你已经完成 ${count} 次训练！


表达习惯已经建立。


下一阶段：

打造自己的表达风格。

`;



}



box.innerHTML = message;



}



updateAIWelcome();


function updateAIMemory(){


let box =
document.getElementById(
"ai-memory"
);



if(!box){

return;

}



let memory =
getAIMemory();




box.innerHTML =


`
🌱 已陪伴你：

${memory.total} 次训练

<br>

当前状态：

${memory.problem}

`;



}



updateAIMemory();


function loadInspire(){


let texts=[

"表达不是展示自己，而是让别人理解自己。",

"每天一分钟，坚持一年，你会遇见更好的自己。",

"敢开口，就是表达成长的开始。",

"好的表达来自持续输入和不断练习。",

"不要追求完美表达，先成为持续表达的人。"

];


let box =
document.getElementById(
"daily-inspire"
);



if(box){


let index =
Math.floor(Math.random()*texts.length);


box.innerHTML =
"✨ "+texts[index];


}



}


loadInspire();
