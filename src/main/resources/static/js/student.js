$(function() {
    var user = JSON.parse(localStorage.getItem("user"));
    var uid = user.uid;
    // alert(uid);
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
                $(".navbar-brand").html(username + "(" + student.sno + ")");
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
        var sno = $("#num").val().trim();
        console.log(sname + ssex + sage + sno);
        if (sname == "" || sage == "") {
            alert("请输入完整");
        } else {
            $.ajax({
                type: "put",
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
                        window.location.reload();
                    } else {
                        alert("修改失败");
                        $("#username").val('');
                        $("#ssex").val('');
                        $("#sage").val('');
                    }
                },
                error: function (response) {
                    if (response.code == 0) {
                        alert("修改成功");
                    } else {
                        alert("修改失败");
                    }
                },
            })
        }

    })
    $("#gradeTab").on("click",function () {
        $.ajax({
            type:'get',
            url:"/grade/student/all?sno="+uid,
            contentType:'application/json',
            dataType:'json',
            success:function(response) {
                // alert("获取全部成绩数据成功");
                if(response.code == 0) {
                    console.log(response);
                    let grades = response.data.grades;
                    let showGraHtml = "";
                    for (let i = 0; i < grades.length; i++) {
                        let n = i + 1;
                        html = " <tr>\n" +
                            "                                <td>" + n + "</td>\n" +
                            "                                <td>" + grades[i].cno + "</td>\n" +
                            "                                <td>" + grades[i].cname + "</td>\n" +
                            "                                <td>" + grades[i].score + "</td>\n" +
                            "                                <td>" + grades[i].credit + "</td>\n" +
                            "                                <td>" + grades[i].ctime + "</td>\n" +
                            "                                <td>" + grades[i].ctype + "</td>\n" +
                            "                            </tr>";
                        showGraHtml += html;
                    }
                    ;
                    $("#showGrade").html(showGraHtml);
                } else {
                    alert("服务器据出错啦！")
                }

            }
        })

        $("#gradeBtn").on("click",function () {
            let ctype=$("#ctype").val().trim();
            let cname=$("#cname").val().trim();
            let showType=$("#showType").val().trim();
            let compare = "";
            if(showType == "显示全部成绩"){
                compare = "";
            }else if(showType == "显示及格成绩"){
                compare = ">";
            }else {
                compare = "<";
            }
            $.ajax({
                type: 'post',
                url: "/grade/student/btn",
                contentType: 'application/json',
                data:JSON.stringify({
                    "sno" : uid,
                    "cname" : cname,
                    "ctype" : ctype,
                    "compare" : compare
                }),
                dataType: 'json',
                success: function (response) {
                    // alert("获取全部成绩数据成功");
                    if (response.code == 0) {
                        console.log(response);
                        let grades = response.data.grades;
                        let showGraHtml = "";
                        for (let i = 0; i < grades.length; i++) {
                            let n = i + 1;
                            html = " <tr>\n" +
                                "                                <td>" + n + "</td>\n" +
                                "                                <td>" + grades[i].cno + "</td>\n" +
                                "                                <td>" + grades[i].cname + "</td>\n" +
                                "                                <td>" + grades[i].score + "</td>\n" +
                                "                                <td>" + grades[i].credit + "</td>\n" +
                                "                                <td>" + grades[i].ctime + "</td>\n" +
                                "                                <td>" + grades[i].ctype + "</td>\n" +
                                "                            </tr>";
                            showGraHtml += html;
                        }
                        ;
                        $("#showGrade").html(showGraHtml);
                    } else {
                        alert("服务器据出错啦！")
                    }

                }
            })
        })

    });
})