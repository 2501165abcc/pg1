//配列を用意
var tasks = [];

//保存データを読み込む
window.onload = function() {
    var data = localStorage.getItem("goals");
    if (data !== null) {
        tasks = JSON.parse(data);
        show();
    }
};

var btn = document.getElementById("add-button");
var input = document.getElementById("todo-input");

//追加ボタン
btn.onclick = function() {
    var val = input.value;
    if (val !== "" && tasks.length < 6) {
        var obj = { text: val, check: false };
        tasks.push(obj);
        input.value = "";
        save();
    }
};

//保存して表示
function save() {
    localStorage.setItem("goals", JSON.stringify(tasks));
    show();
}

//削除用の関数
function deleteTask(index) {

    tasks.splice(index, 1);
    save();
}

// 画面に表示する
function show() {
    var list = document.getElementById("todo-list");
    list.innerHTML = "";

    for (var i = 0; i < tasks.length; i++) {
        var li = document.createElement("li");
        
        //チェックボックス
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = tasks[i].check;
        cb.id = "cb-" + i;
        cb.onclick = (function(n) {
            return function() {
                tasks[n].check = this.checked;
                save();
            };
        })(i);

        //テキスト
        var span = document.createElement("span");
        span.textContent = (i + 1) + ". " + tasks[i].text;
        if (tasks[i].check === true) {
            span.className = "done";
        }

        //削除ボタン
        var delBtn = document.createElement("button");
        delBtn.textContent = "削除";
        delBtn.className = "del-btn";
        //ボタンを押した時に削除関数を実行
        delBtn.onclick = (function(n) {
            return function() {
                deleteTask(n);
            };
        })(i);

        li.appendChild(cb);
        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    }
    document.getElementById("count").textContent = tasks.length + " / 6";
}