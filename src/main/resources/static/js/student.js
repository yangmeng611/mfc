$(function() {
    var user = JSON.parse(localStorage.getItem("user"));
    var uid = user.uid;

    $.ajax({
        type: "get",
        url: "/student/" + uid,
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.code == 0) {
                // alert("数据获取成功");
                let student = response.data.student;
                var username = student.sname;
                $(".navbar-text").html(username + "(" + student.sno + ")");
                $("#stuTable").html("<tr>\n" +
                    "                            <td style=\"width: 40%;\">姓名</td>\n" +
                    "                            <td id=\"name\" style=\"width: 60%;\">" + student.sname + "</td>\n" +
                    "                        </tr>\n" +
                    "                        <tr>\n" +
                    "                            <td>学号</td>\n" +
                    "                            <td id=\"sno\">" + student.sno + "</td>\n" +
                    "                        <tr>\n" +
                    "                            <td>性别</td>\n" +
                    "                            <td id=\"sex\">" + student.ssex + "</td>\n" +
                    "                        </tr>\n" +
                    "                        <tr>\n" +
                    "                            <td>年龄</td>\n" +
                    "                            <td id=\"age\">" + student.sage + "</td>\n" +
                    "                        </tr>\n" +
                    "                        <tr>\n" +
                    "                              <td>专业</td>\n" +
                    "                            <td id=\"depart\">" + student.major + "</td>\n" +
                    "                        </tr>\n" +
                    "                        <tr>\n" +
                    "                            <td>院系</td>\n" +
                    "                            <td id=\"major\">" + student.depart + "</td>\n" +
                    "                        </tr>");
                $("#num").html(uid);
                $("#num2").html(uid);
                $("#smajor").html(student.major);
                $("#sdepart").html(student.depart);


            } else {
                alert("获取数据失败");
            }
        }


    })
    $("#logout").on("click",function(){
        $.ajax({
            type:"get",
            url:"/user/logout",
            success:function(response){
                if(confirm("确认退出登录?")){
                    window.location.href="/";
                }

            }
        })
    })
    $("#btn").on("click",function () {
        let cname = $("#cname1").val().trim();
        let grades=null;
        let totalSize=null;
        let pageNo = 1;
        let pageNum = 1;
        let loadGrade = function(pageNo) {
            $.ajax({
                type: 'post',
                url: "/grade/student/btn?page=1",
                contentType: 'application/json',
                data: JSON.stringify({
                    "sno": uid,
                    "cname": cname,
                    "ctype": "",
                    "compare": ""
                }),
                success: function (response) {
                    // alert("获取全部成绩数据成功");
                    if (response.code == 0) {
                        console.log(response);
                        data = response.data.pageInfo;
                        console.log(data);

                        grades = data.list;
                        pageNum = data.pages;
                        totalSize = grades.length;
                        $("#gradeData").html("");
                        for (var i = 0; i < totalSize; i++) {

                            $("#gradeData").append(
                                " <tr>\n" +
                                "                                <td>" + (i + 1) + "</td>\n" +
                                "                                <td>" + grades[i].cno + "</td>\n" +
                                "                                <td>" + grades[i].cname + "</td>\n" +
                                "                                <td>" + grades[i].score + "</td>\n" +
                                "                                <td>" + grades[i].credit + "</td>\n" +
                                "                                <td>" + grades[i].ctime + "</td>\n" +
                                "                                <td>" + grades[i].ctype + "</td>\n" +
                                "                            </tr>");
                        }
                        ;
                        $("#PageText").html("一共" + pageNum + "页,当前第" + 1 + "页");

                    } else {
                        alert("服务器据出错啦！")
                    }

                }
            })
        };
        $("#index1").on("click",function () {
            pageNo = 1;
            loadGrade(pageNo);
        });

        $("#last1").on("click",function (){
            if(pageNo == 1){
                return false;
            } else {
                pageNo--;
                loadGrade(pageNo);

            }
        });
        $("#next1").on("click",function (){
            if(pageNo == pageNum){
                return false;
            } else {
                pageNo++;
                loadGrade(pageNo);
            }
        });
        $("#final1").on("click",function (){
            pageNo = pageNum;
            loadGrade(pageNo);
        });
        $("#PageBtn").on("click",function (){
            let pageNumber = $.trim($("#pageNum3").val().trim());
            pageNo = pageNumber;
            loadGrade(pageNo);
        });

        if(cname == ""){
            alert("请输入课程名称！");
            $("#cname1").focus();
            return false;
        } else {
            loadGrade(pageNo);
        }
    })
    $("#alertPwd").on("click", function () {
        var newPwd = $("#newPwd").val();
        var newPwd2 = $("#newPwd2").val();
        var oldPwd = $("#oldPwd").val();
        console.log(oldPwd + newPwd + newPwd2);
        var old = user.upwd;
        var utype = user.utype;
        if (oldPwd == null || newPwd == null || newPwd2 == null) {
            alert("请输入完整");
        } else if (oldPwd != old) {
            alert("旧密码输入不正确，请重新输入！")
            $("#oldPwd").val('');
        } else if (newPwd2 != newPwd) {
            alert("两次输入密码不一致，请重新输入！")
            $("#newPwd2").val('');
        } else {
            $.ajax({
                type: "post",
                url: "/user",
                data: JSON.stringify({
                    "uid": uid,
                    "upwd": newPwd,
                }),
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    if (response.code == 0) {
                        alert("修改成功");
                        localStorage.setItem("user", JSON.stringify({
                            "uid": uid,
                            "upwd": newPwd,
                            "utype": utype
                        }));
                        $('#pwd').modal('hide');
                        window.location.reload();
                    } else {
                        alert("修改失败");
                        $("#oldPwd").val('');
                        $("#newPwd").val('');
                        $("#newPwd2").val('');
                    }
                },
            })
        }

    })
    $("#alertInfo").on("click", function () {
        var sname = $("#username").val().trim();
        var ssex = $("#ssex").val().trim();
        var sage = $("#sage").val().trim();
        console.log(sname + ssex + sage + uid);
        if (sname == "" || sage == "") {
            alert("请输入完整");
        } else {
            $.ajax({
                type: "post",
                url: "/student",
                data: JSON.stringify({
                    "sno": uid,
                    "sname": sname,
                    "ssex": ssex,
                    "sage": sage,
                }),
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    if (response.code == 0) {
                        alert("修改成功");
                        $('#alter').modal('hide');
                        window.location.reload();
                    } else {
                        alert("修改失败");
                        $("#username").val('');
                        $("#ssex").val('');
                        $("#sage").val('');
                    }
                },
            })
        }

    })
    $("#gradeTab").on("click",function () {
        let grades=null;
        let totalSize=null;
        let pageNo = 1;
        let pageNum = 1;
        let grades1=null;
        let totalSize1=null;
        let pageNum1 = 1;
        let flag = false;
        let loadGrade = function (pageNo) {
            flag = false;
            $.ajax({
                type: 'get',
                url: "/grade/student/all?sno=" + uid + "&page=" + pageNo,
                contentType: 'application/json',
                dataType: 'json',
                success: function (response) {
                    // alert("获取全部成绩数据成功");
                    if (response.code == 0) {
                        console.log(response);
                        data = response.data.pageInfo;
                        console.log(data);

                        grades = data.list;
                        pageNum = data.pages;
                        totalSize = grades.length;

                        if (pageNo > pageNum) {
                            pageNo = pageNum;
                        }
                        $("#showGrade").html("");
                        for (var i = 0; i < totalSize; i++) {

                            $("#showGrade").append(
                                " <tr>\n" +
                                "                                <td>" + (i + 1) + "</td>\n" +
                                "                                <td>" + grades[i].cno + "</td>\n" +
                                "                                <td>" + grades[i].cname + "</td>\n" +
                                "                                <td>" + grades[i].score + "</td>\n" +
                                "                                <td>" + grades[i].credit + "</td>\n" +
                                "                                <td>" + grades[i].ctime + "</td>\n" +
                                "                                <td>" + grades[i].ctype + "</td>\n" +
                                "                            </tr>");
                        }
                        ;
                        $("#gradePageText").html("一共" + pageNum + "页,当前第" + pageNo + "页");
                    } else {
                        alert("服务器据出错啦！")
                    }

                }
            })
        };
        $("#index").on("click",function () {
            pageNo = 1;
            if(flag == true){
                gradeBtn(pageNo);
            } else{
                loadGrade(pageNo);
            }
        });

        $("#last").on("click",function (){
            if(pageNo == 1){
                return false;
            } else {
                pageNo--;
                if(flag){
                    gradeBtn(pageNo);
                } else{
                    loadGrade(pageNo);
                }
            }
        });
        $("#next").on("click",function (){
            if(flag){
                if(pageNo == pageNum1){
                    return false;
                } else {
                    pageNo++;
                    gradeBtn(pageNo);
                }
            } else {
                if(pageNo == pageNum){
                    return false;
                } else {
                    pageNo++;
                    loadGrade(pageNo);
                }
            }

        });
        $("#final").on("click",function (){
            if(flag){
                pageNo = pageNum1;
                gradeBtn(pageNo);
            } else{
                pageNo = pageNum;
                loadGrade(pageNo);
            }

        });
        $("#gradePageBtn").on("click",function (){
            let pageNumber = $.trim($("#pageNum").val().trim());
            pageNo = pageNumber;
            if(flag){
                gradeBtn(pageNo);
            } else{
                loadGrade(pageNo);
            }
        });
        let gradeBtn = function (pageNo) {
            flag = true;

            let ctype = $("#ctype").val().trim();
            let cname = $("#cname").val().trim();
            let showType = $("#showType").val().trim();
            let compare = "";
            if (showType == "显示全部成绩") {
                compare = "";
            } else if (showType == "显示及格成绩") {
                compare = ">";
            } else {
                compare = "<";
            }
            $.ajax({
                type: 'post',
                url: "/grade/student/btn?page=" + pageNo,
                contentType: 'application/json',
                data: JSON.stringify({
                    "sno": uid,
                    "cname": cname,
                    "ctype": ctype,
                    "compare": compare
                }),
                dataType: 'json',
                success: function (response) {
                    // alert("获取全部成绩数据成功");
                    if (response.code == 0) {
                        console.log(response);
                        data1 = response.data.pageInfo;
                        console.log(data1);

                        grades1 = data1.list;
                        pageNum1 = data1.pages;
                        totalSize1 = grades1.length;

                        if (pageNo > pageNum1) {
                            pageNo = pageNum1;
                        }
                        $("#showGrade").html("");
                        for (var i = 0; i < totalSize1; i++) {

                            $("#showGrade").append(
                                " <tr>\n" +
                                "                                <td>" + (i + 1) + "</td>\n" +
                                "                                <td>" + grades1[i].cno + "</td>\n" +
                                "                                <td>" + grades1[i].cname + "</td>\n" +
                                "                                <td>" + grades1[i].score + "</td>\n" +
                                "                                <td>" + grades1[i].credit + "</td>\n" +
                                "                                <td>" + grades1[i].ctime + "</td>\n" +
                                "                                <td>" + grades1[i].ctype + "</td>\n" +
                                "                            </tr>");
                        }
                        ;
                        $("#gradePageText").html("一共" + pageNum1 + "页,当前第" + pageNo + "页");

                    } else {
                        alert("服务器据出错啦！")
                    }

                }
            })
        };
        loadGrade(pageNo);
        $("#gradeBtn").on("click", function(){
            pageNo = 1;
            gradeBtn(pageNo);
        });

    });
})