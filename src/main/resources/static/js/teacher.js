$(function() {
    var user = JSON.parse(localStorage.getItem("user"));
    var uid = user.uid;
    // alert(uid);
    $.ajax({
        type: "get",
        url: "/teacher/" + uid,
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.code == 0) {
                // alert("数据获取成功");
                let teacher = response.data.teacher;
                var username = teacher.tname;
                $(".navbar-brand").html(username + "(" + teacher.tno + ")");
                $("#teaTable").html("<tr>\n" +
                    "                            <td style=\"width: 40%;\">姓名</td>\n" +
                    "                            <td style=\"width: 60%;\">" + teacher.tname + "</td>\n" +
                    "                        </tr>\n" +
                    "                        <tr>\n" +
                    "                            <td>职工号</td>\n" +
                    "                            <td>" + teacher.tno + "</td>\n" +
                    "                        <tr>\n" +
                    "                            <td>性别</td>\n" +
                    "                            <td>" + teacher.tsex + "</td>\n" +
                    "                        </tr>\n" +
                    "                        <tr>\n" +
                    "                            <td>院系</td>\n" +
                    "                            <td>" + teacher.tdepart + "</td>\n" +
                    "                        </tr>");
                $("#num").html(uid);
                $("#tdepart").html(teacher.tdepart);
                $("#tno").html(uid);

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
        var tname = $("#username").val();
        var tsex = $("#tsex").val();
        // var tno = $("#num").val();
        if (tname == null) {
            alert("请输入完整");
        } else {
            $.ajax({
                type: "post",
                url: "/teacher",
                data: JSON.stringify({
                    "tno": uid,
                    "tname": tname,
                    "tsex": tsex,
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
                        $("#tsex").val('');
                        $("#tage").val('');
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
    $("#classTab").on("click",function f(){
        // alert("查询该教师全课程");
        $.ajax({
            type: "get",
            url: "course/teacher/all?tno=" + uid,
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                if (response.code == 0) {
                    // alert("课程数据获取成功");
                    let courses = response.data.courses;
                    console.log(courses);
                    showClassHtml = " <table class=\"table table-bordered table-condensed\" style=\"border-color: black\">\n" +
                        "                            <tr>\n" +
                        "                                <th style=\"width: 10%\">序号</th>\n" +
                        "                                <th style=\"width: 20%\">课程编号</th>\n" +
                        "                                <th style=\"width: 20%\">课程名称</th>\n" +
                        "                                <th style=\"width: 15%\">学分</th>\n" +
                        "                                <th style=\"width: 15%\">学时</th>\n" +
                        "                                <th style=\"width: 20%\">课程性质</th>\n" +
                        "                            </tr>";
                    for (var i = 0; i < courses.length; i++) {
                        n = i+1;
                        html = "<tr>\n" +
                            "<td>"+ n +"</td>\n" +
                            "<td>"+ courses[i].cno +"</td>\n" +
                            "<td>"+ courses[i].cname +"</td>\n" +
                            "<td>"+ courses[i].credit +"</td>\n" +
                            "<td>"+ courses[i].ctime +"</td>\n" +
                            "<td>"+ courses[i].ctype +"</td>\n" +
                            "</tr>\n";
                        showClassHtml += html;
                    }
                    showClassHtml += "</table>";
                    $("#showClass").html(showClassHtml);
                } else {
                    alert("您还未被安排授课！");
                }
            },
        })
        $("#seaCourse").on("click", function () {
            var ctype = $("#ctype").val().trim();
            var cname = $("#cname").val().trim();
            console.log(ctype + cname);
            if ( cname != "") {
                $.ajax({
                    type: "post",
                    url: "course/teacher/cname",
                    data: JSON.stringify({
                        "cname": cname,
                        "tno": uid,
                    }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (response) {
                        if (response.code == 0) {
                            let courses = response.data.courses;
                            console.log(courses);
                            showClassHtml = " <table class=\"table table-bordered table-condensed\" style=\"border-color: black\">\n" +
                                "                            <tr>\n" +
                                "                                <th style=\"width: 10%\">序号</th>\n" +
                                "                                <th style=\"width: 20%\">课程编号</th>\n" +
                                "                                <th style=\"width: 20%\">课程名称</th>\n" +
                                "                                <th style=\"width: 15%\">学分</th>\n" +
                                "                                <th style=\"width: 15%\">学时</th>\n" +
                                "                                <th style=\"width: 20%\">课程性质</th>\n" +
                                "                            </tr>";
                            for (var i = 0; i < courses.length; i++) {
                                n = i+1;
                                html = "<tr>\n" +
                                    "<td>"+ n +"</td>\n" +
                                    "<td>"+ courses[i].cno +"</td>\n" +
                                    "<td>"+ courses[i].cname +"</td>\n" +
                                    "<td>"+ courses[i].credit +"</td>\n" +
                                    "<td>"+ courses[i].ctime +"</td>\n" +
                                    "<td>"+ courses[i].ctype +"</td>\n" +
                                    "</tr>\n";
                                showClassHtml += html;
                            }
                            showClassHtml += "</table>";
                            $("#showClass").html(showClassHtml);
                        } else {
                            alert("您未教授该课程！");
                        }
                    },
                })
            } else if (ctype != "==请选择==") {
                // alert(ctype);
                $.ajax({
                    type: "post",
                    url: "course/teacher/ctype",
                    data: JSON.stringify({
                        "ctype": ctype,
                        "tno": uid,
                    }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (response) {
                        if (response.code == 0) {
                            // alert("课程数据获取成功");
                            let courses = response.data.courses;
                            showClassHtml = " <table class=\"table table-bordered table-condensed\" style=\"border-color: black\">\n" +
                                "                            <tr>\n" +
                                "                                <th style=\"width: 10%\">序号</th>\n" +
                                "                                <th style=\"width: 20%\">课程编号</th>\n" +
                                "                                <th style=\"width: 20%\">课程名称</th>\n" +
                                "                                <th style=\"width: 15%\">学分</th>\n" +
                                "                                <th style=\"width: 15%\">学时</th>\n" +
                                "                                <th style=\"width: 20%\">课程性质</th>\n" +
                                "                            </tr>";
                            for (var i = 0; i < courses.length; i++) {
                                n = i+1;
                                html = "<tr>\n" +
                                    "<td>"+ n +"</td>\n" +
                                    "<td>"+ courses[i].cno +"</td>\n" +
                                    "<td>"+ courses[i].cname +"</td>\n" +
                                    "<td>"+ courses[i].credit +"</td>\n" +
                                    "<td>"+ courses[i].ctime +"</td>\n" +
                                    "<td>"+ courses[i].ctype +"</td>\n" +
                                    "</tr>\n";
                                showClassHtml += html;
                            }
                            showClassHtml += "</table>";
                            $("#showClass").html(showClassHtml);
                        } else {
                            alert("未查询到该课程！");
                        }
                    },
                })
            } else {
                alert("请输入筛选条件！");
            }

        })
    })
    $("#gradeTab").on("click",function () {
        $.ajax({
            type:'get',
            url:"/grade/teacher/all?tno="+uid,
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
                            "                                <td>" + grades[i].sname + "</td>\n" +
                            "                                <td>" + grades[i].sno + "</td>\n" +
                            "                                <td>" + grades[i].score + "</td>\n" +
                            "                                <td>" + grades[i].credit + "</td>\n" +
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
            let ctype=$("#ctype2").val().trim();
            let cname=$("#cname2").val().trim();
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
                url: "/grade/teacher/btn",
                contentType: 'application/json',
                data:JSON.stringify({
                    "tno" : uid,
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
                                "                                <td>" + grades[i].sname + "</td>\n" +
                                "                                <td>" + grades[i].sno + "</td>\n" +
                                "                                <td>" + grades[i].score + "</td>\n" +
                                "                                <td>" + grades[i].credit + "</td>\n" +
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
    $("#analyseTab").on("click",function () {
        $.ajax({
            type: 'get',
            url: "/grade/teacher/analyse?tno=" + uid,
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (response.code == 0) {
                    let levels = response.data.levels;
                    let failGra = levels.fails;
                    let goodGra = levels.good;
                    let excellenceGra = levels.excellence;
                    let minGra = levels.minGra;
                    let maxGra = levels.maxGra;
                    let avgGra = levels.avgGra;
                    let ctx = document.getElementById('myChart');
                    let myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['平均分','最高分','最低分','优秀率(>80)', '良好率(60-80)','不及格率(<60)'],
                            datasets: [{
                                label: 'Score analysis',
                                data: [avgGra,maxGra,minGra,excellenceGra,goodGra,failGra],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.7)',
                                    'rgba(54, 162, 235, 0.7)',
                                    'rgba(255, 206, 86, 0.7)',
                                    'rgba(75, 192, 192, 0.7)',
                                    'rgba(153, 102, 255, 0.7)',
                                    'rgba(255, 159, 64, 0.7)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 0.7)',
                                    'rgba(54, 162, 235, 0.7)',
                                    'rgba(255, 206, 86, 0.7)',
                                    'rgba(75, 192, 192, 0.7)',
                                    'rgba(153, 102, 255, 0.7)',
                                    'rgba(255, 159, 64, 0.7)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        max: 100
                                    }
                                }]
                            },
                            title: {
                                display: true,
                                text: '全部成绩分析',
                                fontSize:20
                            }
                        }
                    });
                    $("#analyseCou").on("click",function () {
                        let cname = $("#cname1").val().trim();
                        alert(cname);
                        $.ajax({
                            type: 'POST',
                            url: "/grade/teacher/analyse",
                            contentType: 'application/json',
                            data:JSON.stringify({
                                "cname":cname,
                                "tno":uid
                            }),
                            dataType: 'json',
                            success: function (response) {
                                if (response.code == 0) {
                                    let levels = response.data.levels;
                                    let failGra = levels.fails;
                                    let goodGra = levels.good;
                                    let excellenceGra = levels.excellence;
                                    let minGra = levels.minGra;
                                    let maxGra = levels.maxGra;
                                    let avgGra = levels.avgGra;
                                    removeData(myChart);
                                    removeData(myChart);
                                    removeData(myChart);
                                    removeData(myChart);
                                    removeData(myChart);
                                    removeData(myChart);
                                    addData(myChart,"平均分",avgGra);
                                    addData(myChart,"最高分",maxGra);
                                    addData(myChart,"最低分",minGra);
                                    addData(myChart,"优秀率(>80)",excellenceGra);
                                    addData(myChart,"良好率(60-80)",goodGra);
                                    addData(myChart,"不及格率(<60)",failGra);
                                    updateConfigByMutating(myChart,cname);
                                } else {
                                    alert(" 服务器出错啦");
                                }
                            },
                            error: function () {
                                alert("错误啦");
                            }
                        })
                    })
                } else {
                    alert(" 服务器出错啦");
                }
            }
        })
        function addData(chart, label, data) {
            chart.data.labels.push(label);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(data);
            });
            chart.update();
        }

        function removeData(chart) {
            chart.data.labels.pop();
            chart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
            chart.update();
        }
        function updateConfigByMutating(chart,title) {
            chart.options.title.text = title;
            chart.update();
        }
    })

    $("#addGrade").on("click",function () {
        let cno = $("#cno").val().trim();
        let sno = $("#sno").val().trim();
        let degree = $("#degree").val();
        $.ajax({
            type: 'put',
            url: "/grade/add",
            contentType: 'application/json',
            data: JSON.stringify({
                "cno": cno,
                "sno": sno,
                "degree": degree
            }),
            dataType: 'json',
            success: function (response) {
                if (response.code == 0) {
                    $('#insert').modal('hide');
                    alert(" 成绩录入成功");
                    $.ajax({
                        type: 'post',
                        url: "/grade/new",
                        data: JSON.stringify({
                            "sno": sno,
                            "cno": cno
                        }),
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (response) {
                            // alert("获取全部成绩数据成功");
                            if (response.code == 0) {
                                console.log(response);
                                let grade = response.data.grade;
                                var _len = $("#showGrade tr").length;
                                $("#showGrade").append(" <tr>\n" +
                                    "                                <td>" + (_len + 2) + "</td>\n" +
                                    "                                <td>" + grade.cno + "</td>\n" +
                                    "                                <td>" + grade.cname + "</td>\n" +
                                    "                                <td>" + grade.sname + "</td>\n" +
                                    "                                <td>" + grade.sno + "</td>\n" +
                                    "                                <td>" + grade.score + "</td>\n" +
                                    "                                <td>" + grade.credit + "</td>\n" +
                                    "                                <td>" + grade.ctype + "</td>\n" +
                                    "                            </tr>");
                            } else {
                                alert("获取单次成绩数据失败");
                            }
                        }
                    })
                } else {
                    alert(" 成绩录入失败");
                }
            }
        })
    })

})