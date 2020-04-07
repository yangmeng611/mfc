$(function() {
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
        let tips = $("#tips").val().trim();
        let grades=null;
        let totalSize=null;
        let pageNo = 1;
        let pageNum = 1;
        let loadGrade = function(pageNo) {
            $.ajax({
                type: 'post',
                url: "grade/btn?page=" + pageNo,
                contentType: 'application/json',
                data: JSON.stringify({
                    "tips":tips
                }),
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
                        $("#gradeData").html("");
                        for (var i = 0; i < totalSize; i++) {
                            $("#gradeData").append(
                                " <tr>\n" +
                                "                                <td>" + (i + 1) + "</td>\n" +
                                "                                <td>" + grades[i].cno + "</td>\n" +
                                "                                <td>" + grades[i].cname + "</td>\n" +
                                "                                <td>" + grades[i].sname + "</td>\n" +
                                "                                <td>" + grades[i].sno + "</td>\n" +
                                "                                <td>" + grades[i].score + "</td>\n" +
                                "                                <td>" + grades[i].credit + "</td>\n" +
                                "                                <td>" + grades[i].ctype + "</td>\n" +
                                "                            </tr>");
                        }
                        ;
                        $("#PageText").html("一共" + pageNum + "页,当前第" + pageNo + "页");
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
            let pageNumber = $.trim($("#pageNum4").val().trim());
            pageNo = pageNumber;
            loadGrade(pageNo);
        });

        if(tips == ""){
            alert("请输入查询条件！");
            $("#tips").focus();
            return false;
        } else {
            loadGrade(pageNo);
        }
    })
    $("#findAllStu").on("click", function () {
        let students=null;
        let totalSize=null;
        let pageNo = 1;
        let pageNum = 1;
        let students1=null;
        let totalSize1=null;
        let pageNum1 = 1;
        let flag = false;
        let loadStudent = function (pageNo) {
            flag = false;
            $.ajax({
                type: 'get',
                url: "/student/all?page=" + pageNo,
                contentType: 'application/json',
                dataType: 'json',
                success: function (response) {
                    if (response.code == 0) {
                        data = response.data.pageInfo;
                        console.log(data);

                        students = data.list;
                        pageNum = data.pages;
                        totalSize = students.length;

                        if (pageNo > pageNum) {
                            pageNo = pageNum;
                        }
                        $("#showStu").html("");
                        for (var i = 0; i < totalSize; i++) {

                            $("#showStu").append(
                                " <tr>\n" +
                                "                                <td>" + (i+1) + "</td>\n" +
                                "                                <td>" + students[i].sno + "</td>\n" +
                                "                                <td>" + students[i].sname + "</td>\n" +
                                "                                <td>" + students[i].ssex + "</td>\n" +
                                "                                <td>" + students[i].sage + "</td>\n" +
                                "                                <td>" + students[i].major + "</td>\n" +
                                "                                <td>" + students[i].depart + "</td>\n" +
                                "                                <td></td>\n" +
                                "                            </tr>");
                        }
                        ;
                        $("#studentPageText").html("一共" + pageNum + "页,当前第" + pageNo + "页");
                        editable();
                    } else {
                        alert("获取全部学生数据失败！")
                    }

                }
            })
        };
        let editable = function () {
            $('.editable').handleTable({
                "handleFirst": false,
                "cancel": " <span class='glyphicon glyphicon-remove-circle'></span> ",
                "edit": " <span class='glyphicon glyphicon-edit'></span> ",
                "add": " <span class='glyphicon glyphicon-plus'></span> ",
                "save": " <span class='glyphicon glyphicon-saved'></span> ",
                "confirm": " <span class='glyphicon glyphicon-ok'></span> ",
                "del": " <span class='glyphicon glyphicon-remove'></span>",
                "operatePos": -1,
                "editableCols": [2, 3, 4, 5, 6],
                "order": ["add", "edit", "del"],
                "saveCallback": function (data, isSuccess) {
                    $.ajax({
                        type: 'post',
                        url: "/student",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "sno": data[1],
                            "sname": data[2],
                            "ssex": data[3],
                            "sage": data[4],
                            "major": data[5],
                            "depart": data[6]
                        }),
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {
                                isSuccess();
                                alert(" 保存成功");
                            } else {
                                alert(" 保存失败");
                            }
                        }
                    })

                },
                "addCallback": function (data, isSuccess) {
                    // for(let i = 1;i <= 6;i++){
                    //     if(data[i]==""){
                    //         alert("请填写完整信息");
                    //     }
                    // }
                    $.ajax({
                        type: 'put',
                        url: "/user/add",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "uid": data[1],
                            "upwd": data[1],
                            "utype": 1
                        }),
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {

                                $.ajax({
                                    type: 'put',
                                    url: "/student/add",
                                    contentType: 'application/json',
                                    data: JSON.stringify({
                                        "sno": data[1],
                                        "sname": data[2],
                                        "ssex": data[3],
                                        "sage": data[4],
                                        "major": data[5],
                                        "depart": data[6]
                                    }),
                                    dataType: 'json',
                                    success: function (response) {
                                        if (response.code == 0) {
                                            isSuccess();
                                            alert(" 添加学生数据成功");
                                        } else {
                                            alert(" 添加学生数据失败");
                                        }
                                    }
                                })
                            } else {
                                alert(" 添加学生数据失败");
                            }
                        },
                        error:function(){
                            alert("添加学生失败");
                        }
                    })
                },
                "delCallback": function (data, isSuccess) {
                    $.ajax({
                        type: 'delete',
                        url: "/student/delete/" + data[1],
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {
                                $.ajax({
                                    type: 'delete',
                                    url: "/user/delete/" + data[1],
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function (response) {
                                        if (response.code == 0) {
                                            isSuccess();
                                            alert(" 删除成功");
                                        } else {
                                            alert(" 删除失败");
                                        }
                                    }
                                })
                            } else {
                                alert(" 删除失败");
                            }
                        }
                    })
                }
            });
        };
        $("#indexStudent").on("click",function () {
            pageNo = 1;
            if(flag == true){
                studentBtn(pageNo);
            } else{
                loadStudent(pageNo);
            }
        });

        $("#lastStudent").on("click",function (){
            if(pageNo == 1){
                return false;
            } else {
                pageNo--;
                if(flag){
                    studentBtn(pageNo);
                } else{
                    loadStudent(pageNo);
                }
            }
        });
        $("#nextStudent").on("click",function (){
            if(flag){
                if(pageNo == pageNum1){
                    return false;
                } else {
                    pageNo++;
                    studentBtn(pageNo);
                }
            } else {
                if(pageNo == pageNum){
                    return false;
                } else {
                    pageNo++;
                    loadStudent(pageNo);
                }
            }

        });
        $("#finalStudent").on("click",function (){
            if(flag){
                pageNo = pageNum1;
                studentBtn(pageNo);
            } else{
                pageNo = pageNum;
                loadStudent(pageNo);
            }

        });
        $("#studentPageBtn").on("click",function (){
            let pageNumber = $.trim($("#pageNum3").val().trim());
            pageNo = pageNumber;
            if(flag){
                studentBtn(pageNo);
            } else{
                loadStudent(pageNo);
            }
        });
        let studentBtn = function (pageNo) {
            flag = true;
            let sno = $("#sno3").val().trim();
            let sname = $("#sname3").val().trim();
            let major = $("#smajor3").val().trim();
            let depart = $("#sdepart3").val().trim();
            $.ajax({
                type: 'post',
                url: "student/btn?page=" + pageNo,
                contentType: 'application/json',
                data: JSON.stringify({
                    "sno": sno,
                    "sname": sname,
                    "age": "",
                    "major": major,
                    "depart": depart
                }),
                dataType: 'json',
                success: function (response) {
                    if (response.code == 0) {
                        data1 = response.data.pageInfo;
                        console.log(data1);

                        students1 = data1.list;
                        pageNum1 = data1.pages;
                        totalSize1 = students1.length;

                        if (pageNo > pageNum1) {
                            pageNo = pageNum1;
                        }
                        $("#showStu").html("");
                        for (var i = 0; i < totalSize1; i++) {

                            $("#showStu").append(
                                " <tr>\n" +
                                "                                <td>" + (i+1) + "</td>\n" +
                                "                                <td>" + students1[i].sno + "</td>\n" +
                                "                                <td>" + students1[i].sname + "</td>\n" +
                                "                                <td>" + students1[i].ssex + "</td>\n" +
                                "                                <td>" + students1[i].sage + "</td>\n" +
                                "                                <td>" + students1[i].major + "</td>\n" +
                                "                                <td>" + students1[i].depart + "</td>\n" +
                                "                                <td></td>\n" +
                                "                            </tr>");
                        }
                        ;
                        $("#studentPageText").html("一共" + pageNum1 + "页,当前第" + pageNo + "页");
                        editable();
                    }
                }
            })
        };
        loadStudent(pageNo);
        $("#stuBtn").on("click", function () {
            pageNo = 1;
            studentBtn(pageNo);
        })

    })
    $("#findAllTea").on("click", function () {
        let teachers=null;
        let totalSize=null;
        let pageNo = 1;
        let pageNum = 1;
        let teachers1=null;
        let totalSize1=null;
        let pageNum1 = 1;
        let flag = false;
        let loadTeacher = function (pageNo) {
            flag = false;
            $.ajax({
                type: 'get',
                url: "/teacher/all?page=" + pageNo,
                contentType: 'application/json',
                dataType: 'json',
                success: function (response) {
                    // alert("获取全部教师数据成功");
                    if (response.code == 0) {
                        data = response.data.pageInfo;
                        console.log(data);

                        teachers = data.list;
                        pageNum = data.pages;
                        totalSize = teachers.length;

                        if (pageNo > pageNum) {
                            pageNo = pageNum;
                        }
                        $("#showTea").html("");
                        for (var i = 0; i < totalSize; i++) {

                            $("#showTea").append(
                                " <tr>\n" +
                                "                                <td>" + (i+1) + "</td>\n" +
                                "                                <td>" + teachers[i].tno + "</td>\n" +
                                "                                <td>" + teachers[i].tname + "</td>\n" +
                                "                                <td>" + teachers[i].tsex + "</td>\n" +
                                "                                <td>" + teachers[i].tdepart + "</td>\n" +
                                "                                <td></td>\n" +
                                "                            </tr>");
                        }
                        ;
                        $("#teacherPageText").html("一共" + pageNum + "页,当前第" + pageNo + "页");
                        editable1();
                    } else {
                        alert("服务器据出错啦！")
                    }

                }
            })
        };
        let editable1 = function () {

            $('.editable1').handleTable({
                "handleFirst": false,
                "cancel": " <span class='glyphicon glyphicon-remove-circle'></span> ",
                "edit": " <span class='glyphicon glyphicon-edit'></span> ",
                "add": " <span class='glyphicon glyphicon-plus'></span> ",
                "save": " <span class='glyphicon glyphicon-saved'></span> ",
                "confirm": " <span class='glyphicon glyphicon-ok'></span> ",
                "del": " <span class='glyphicon glyphicon-remove'></span>",
                "operatePos": -1,
                "editableCols": [2, 3, 4],
                "order": ["add", "edit", "del"],
                "saveCallback": function (data, isSuccess) {
                    $.ajax({
                        type: 'post',
                        url: "/teacher",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "tno": data[1],
                            "tname": data[2],
                            "tsex": data[3],
                            "tdepart": data[4]
                        }),
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {
                                isSuccess();
                                alert(" 保存成功");
                            } else {
                                alert(" 保存失败");
                            }
                        }
                    })

                },
                "addCallback": function (data, isSuccess) {
                    $.ajax({
                        type: 'put',
                        url: "/user/add",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "uid": data[1],
                            "upwd": data[1],
                            "utype": 2
                        }),
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {

                                $.ajax({
                                    type: 'put',
                                    url: "/teacher/add",
                                    contentType: 'application/json',
                                    data: JSON.stringify({
                                        "tno": data[1],
                                        "tname": data[2],
                                        "tsex": data[3],
                                        "tdepart": data[4]
                                    }),
                                    dataType: 'json',
                                    success: function (response) {
                                        if (response.code == 0) {
                                            isSuccess();
                                            alert(" 添加教师数据成功");
                                        } else {
                                            alert(" 添加教师数据失败");
                                        }
                                    }
                                })
                            } else {
                                alert(" 添加教师数据失败");
                            }
                        },
                        error:function(){
                            alert("添加教师失败");
                        }
                    })
                },
                "delCallback": function (data, isSuccess) {
                    $.ajax({
                        type: 'delete',
                        url: "/teacher/delete/" + data[1],
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {
                                $.ajax({
                                    type: 'delete',
                                    url: "/user/delete/" + data[1],
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function (response) {
                                        if (response.code == 0) {
                                            isSuccess();
                                            alert(" 删除成功");
                                        } else {
                                            alert(" 删除失败");
                                        }
                                    }
                                })
                            } else {
                                alert(" 删除失败");
                            }
                        }
                    })
                }
            });
        };
        $("#indexTeacher").on("click",function () {
            pageNo = 1;
            if(flag == true){
                teacherBtn(pageNo);
            } else{
                loadTeacher(pageNo);
            }
        });

        $("#lastTeacher").on("click",function (){
            if(pageNo == 1){
                return false;
            } else {
                pageNo--;
                if(flag){
                    teacherBtn(pageNo);
                } else{
                    loadTeacher(pageNo);
                }
            }
        });
        $("#nextTeacher").on("click",function (){
            if(flag){
                if(pageNo == pageNum1){
                    return false;
                } else {
                    pageNo++;
                    teacherBtn(pageNo);
                }
            } else {
                if(pageNo == pageNum){
                    return false;
                } else {
                    pageNo++;
                    loadTeacher(pageNo);
                }
            }

        });
        $("#finalTeacher").on("click",function (){
            if(flag){
                pageNo = pageNum1;
                teacherBtn(pageNo);
            } else{
                pageNo = pageNum;
                loadTeacher(pageNo);
            }

        });
        $("#teacherPageBtn").on("click",function (){
            let pageNumber = $.trim($("#pageNum2").val().trim());
            pageNo = pageNumber;
            if(flag){
                teacherBtn(pageNo);
            } else{
                loadTeacher(pageNo);
            }
        });
        let teacherBtn = function (pageNo) {
            flag = true;
            let tno = $("#tno2").val().trim();
            let tname = $("#tname2").val().trim();
            let depart = $("#tdepart2").val().trim();
            let cname = $("#tclass2").val().trim();
            $.ajax({
                type: 'post',
                url: "teacher/btn?page=" + pageNo,
                contentType: 'application/json',
                data: JSON.stringify({
                    "tno": tno,
                    "tname": tname,
                    "tdepart": depart,
                    "cname": cname
                }),
                dataType: 'json',
                success: function (response) {
                    if (response.code == 0) {
                        data1 = response.data.pageInfo;
                        console.log(data1);

                        teachers1 = data1.list;
                        pageNum1 = data1.pages;
                        totalSize1 = teachers1.length;

                        if (pageNo > pageNum1) {
                            pageNo = pageNum1;
                        }
                        console.log(teachers1);
                        $("#showTea").html("");
                        for (var i = 0; i < totalSize1; i++) {

                            $("#showTea").append(
                                " <tr>\n" +
                                "                                <td>" + (i+1) + "</td>\n" +
                                "                                <td>" + teachers1[i].tno + "</td>\n" +
                                "                                <td>" + teachers1[i].tname + "</td>\n" +
                                "                                <td>" + teachers1[i].tsex + "</td>\n" +
                                "                                <td>" + teachers1[i].tdepart + "</td>\n" +
                                "                                <td></td>\n" +
                                "                            </tr>");
                        }
                        ;
                        $("#teacherPageText").html("一共" + pageNum1 + "页,当前第" + pageNo + "页");
                        editable1();
                    }
                }
            })
        };
        loadTeacher(pageNo);
        $("#teaBtn").on("click", function () {
            pageNo = 1;
            teacherBtn(pageNo);
        });

    })
    $("#findAllCou").on("click", function () {
        let courses = null;
        let totalSize = null;
        let pageNo = 1;
        let pageNum = 1;
        let courses1 = null;
        let totalSize1 = null;
        let pageNum1 = 1;
        let flag = false;
        let loadCourse = function (pageNo) {
            flag = false;
            $.ajax({
                type: 'get',
                url: "/course/all?page=" + pageNo,
                contentType: 'application/json',
                dataType: 'json',
                success: function (response) {
                    // alert("获取全部课程数据成功");
                    if (response.code == 0) {
                        data = response.data.pageInfo;
                        console.log(data);

                        courses = data.list;
                        pageNum = data.pages;
                        totalSize = courses.length;

                        if (pageNo > pageNum) {
                            pageNo = pageNum;
                        }
                        $("#showClass").html("");
                        for (var i = 0; i < totalSize; i++) {

                            $("#showClass").append(
                                "<tr>\n" +
                                "<td>" + (i + 1) + "</td>\n" +
                                "<td>" + courses[i].cno + "</td>\n" +
                                "<td>" + courses[i].cname + "</td>\n" +
                                "<td>" + courses[i].ctype + "</td>\n" +
                                "<td>" + courses[i].ctime + "</td>\n" +
                                "<td>" + courses[i].credit + "</td>\n" +
                                "<td></td>" +
                                "</tr>");
                        }
                        ;
                        $("#coursePageText").html("一共" + pageNum + "页,当前第" + pageNo + "页");
                        editable2();
                    } else {
                        alert("服务器据出错啦！")
                    }
                }
            })
        };
        let editable2 = function () {
            $('.editable2').handleTable({
                "handleFirst": false,
                "cancel": " <span class='glyphicon glyphicon-remove-circle'></span> ",
                "edit": " <span class='glyphicon glyphicon-edit'></span> ",
                "add": " <span class='glyphicon glyphicon-plus'></span> ",
                "save": " <span class='glyphicon glyphicon-saved'></span> ",
                "confirm": " <span class='glyphicon glyphicon-ok'></span> ",
                "del": " <span class='glyphicon glyphicon-remove'></span>",
                "operatePos": -1,
                "editableCols": [2, 3, 4, 5],
                "order": ["add", "edit", "del"],
                "saveCallback": function (data, isSuccess) {
                    $.ajax({
                        type: 'post',
                        url: "/course",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "cno": data[1],
                            "cname": data[2],
                            "ctype": data[3],
                            "credit": data[4],
                            "ctime": data[5]
                        }),
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {
                                isSuccess();
                                alert(" 保存成功");
                            } else {
                                alert(" 保存失败");
                            }
                        }
                    })

                },
                "addCallback": function (data, isSuccess) {
                    for(let i=1;i<=5;i++) {
                        if(data[i]==""){
                            alert("请填写完整信息");
                            return false;
                        }
                    }
                    $.ajax({
                        type: 'put',
                        url: "/course/add",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "cno": data[1],
                            "cname": data[2],
                            "ctype": data[3],
                            "credit": data[4],
                            "ctime": data[5]
                        }),
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {
                                isSuccess();
                                alert(" 添加课程成功");
                            } else {
                                alert(" 添加课程失败");
                            }
                        },
                        error:function(){
                            alert("添加课程失败");
                        }
                    })
                },
                "delCallback": function (data, isSuccess) {
                    $.ajax({
                        type: 'delete',
                        url: "/course/delete/" + data[1],
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {
                                isSuccess();
                                alert(" 删除成功");
                            } else {
                                alert(" 删除失败");
                            }
                        }
                    })
                }
            });
        };
        $("#indexCourse").on("click", function () {
            pageNo = 1;
            if (flag == true) {
                courseBtn(pageNo);
            } else {
                loadCourse(pageNo);
            }
        });

        $("#lastCourse").on("click", function () {
            if (pageNo == 1) {
                return false;
            } else {
                pageNo--;
                if (flag) {
                    courseBtn(pageNo);
                } else {
                    loadCourse(pageNo);
                }
            }
        });
        $("#nextCourse").on("click", function () {
            if (flag) {
                if (pageNo == pageNum1) {
                    return false;
                } else {
                    pageNo++;
                    courseBtn(pageNo);
                }
            } else {
                if (pageNo == pageNum) {
                    return false;
                } else {
                    pageNo++;
                    loadCourse(pageNo);
                }
            }

        });
        $("#finalCourse").on("click", function () {
            if (flag) {
                pageNo = pageNum1;
                courseBtn(pageNo);
            } else {
                pageNo = pageNum;
                loadCourse(pageNo);
            }

        });
        $("#coursePageBtn").on("click", function () {
            let pageNumber = $.trim($("#pageNum1").val().trim());
            pageNo = pageNumber;
            if (flag) {
                courseBtn(pageNo);
            } else {
                loadCourse(pageNo);
            }
        });
        let courseBtn = function (pageNo) {
            flag = true;
            let cno = $("#cno1").val().trim();
            let cname = $("#cname").val().trim();
            let ctype = $("#ctype1").val().trim();
            let tno = $("#cteacher1").val().trim();
            let csno = $("#csno").val().trim();
            $.ajax({
                type: 'post',
                url: "course/btn?page=" + pageNo,
                contentType: 'application/json',
                data: JSON.stringify({
                    "cno": cno,
                    "cname": cname,
                    "ctype": ctype,
                    "tno": tno,
                    "sno": csno
                }),
                dataType: 'json',
                success: function (response) {
                    // alert(cname);
                    if (response.code == 0) {
                        data1 = response.data.pageInfo;
                        console.log(data1);

                        courses1 = data1.list;
                        pageNum1 = data1.pages;
                        totalSize1 = courses1.length;

                        if (pageNo > pageNum1) {
                            pageNo = pageNum1;
                        }
                        $("#showClass").html("");
                        for (var i = 0; i < totalSize1; i++) {

                            $("#showClass").append(
                                "<tr>\n" +
                                "<td>" + (i + 1) + "</td>\n" +
                                "<td>" + courses1[i].cno + "</td>\n" +
                                "<td>" + courses1[i].cname + "</td>\n" +
                                "<td>" + courses1[i].ctype + "</td>\n" +
                                "<td>" + courses1[i].ctime + "</td>\n" +
                                "<td>" + courses1[i].credit + "</td>\n" +
                                "<td></td>" +
                                "</tr>");
                        }
                        ;
                        $("#coursePageText").html("一共" + pageNum1 + "页,当前第" + pageNo + "页");
                        editable2();
                    }
                }
            })
        };
        loadCourse(pageNo);
        $("#couBtn").on("click", function () {
            pageNo = 1;
            courseBtn(pageNo);
        })

    })
    $("#findAllGra").on("click", function () {
        let grades = null;
        let totalSize = null;
        let pageNo = 1;
        let pageNum = 1;
        let grades1 = null;
        let totalSize1 = null;
        let pageNum1 = 1;
        let flag = false;
        let loadGrade = function (pageNo) {
            flag = false;
            $.ajax({
                type: 'GET',
                url: 'grade/all?page=' + pageNo,
                dataType: 'json',
                async: false,
                success: function (response) {
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
                            "                                <td>" + grades[i].sname + "</td>\n" +
                            "                                <td>" + grades[i].sno + "</td>\n" +
                            "                                <td>" + grades[i].score + "</td>\n" +
                            "                                <td>" + grades[i].credit + "</td>\n" +
                            "                                <td>" + grades[i].ctype + "</td>\n" +

                            "                                <td></td>\n" +
                            "                            </tr>");
                    }
                    ;
                    $("#gradePageText").html("一共" + pageNum + "页,当前第" + pageNo + "页");
                    editable3();
                }
            });
        };

        let editable3 = function () {
            $('.editable3').handleTable({
                "handleFirst": false,
                "cancel": " <span class='glyphicon glyphicon-remove-circle'></span> ",
                "edit": " <span class='glyphicon glyphicon-edit'></span> ",
                "add": " <span class='glyphicon glyphicon-plus'></span> ",
                "save": " <span class='glyphicon glyphicon-saved'></span> ",
                "confirm": " <span class='glyphicon glyphicon-ok'></span> ",
                "del": " <span class='glyphicon glyphicon-remove'></span>",
                "operatePos": -1,
                "editableCols": [5],
                "order": ["edit", "del"],
                "saveCallback": function (data, isSuccess) {
                    $.ajax({
                        type: 'post',
                        url: "/grade",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "cno": data[1],
                            "sno": data[4],
                            "degree": data[5]
                        }),
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {
                                isSuccess();
                                alert(" 保存成功");
                            } else {
                                alert(" 保存失败");
                            }
                        }
                    })

                },
                "delCallback": function (data, isSuccess) {
                    // alert(data[1]+data[4]);
                    $.ajax({
                        type: 'delete',
                        url: "/grade/delete",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "sno": data[4],
                            "cno": data[1]
                        }),
                        dataType: 'json',
                        success: function (response) {
                            if (response.code == 0) {
                                isSuccess();
                                alert(" 删除成功");
                            } else {
                                alert(" 删除失败");
                            }
                        }
                    })
                }
            });
        };
        $("#index").on("click", function () {
            pageNo = 1;
            if (flag == true) {
                gradeBtn(pageNo);
            } else {
                loadGrade(pageNo);
            }
        });

        $("#last").on("click", function () {
            if (pageNo == 1) {
                return false;
            } else {
                pageNo--;
                if (flag) {
                    gradeBtn(pageNo);
                } else {
                    loadGrade(pageNo);
                }
            }
        });
        $("#next").on("click", function () {
            if (flag) {
                if (pageNo == pageNum1) {
                    return false;
                } else {
                    pageNo++;
                    gradeBtn(pageNo);
                }
            } else {
                if (pageNo == pageNum) {
                    return false;
                } else {
                    pageNo++;
                    loadGrade(pageNo);
                }
            }

        });
        $("#final").on("click", function () {
            if (flag) {
                pageNo = pageNum1;
                gradeBtn(pageNo);
            } else {
                pageNo = pageNum;
                loadGrade(pageNo);
            }

        });
        $("#gradePageBtn").on("click", function () {
            let pageNumber = $.trim($("#pageNum").val().trim());
            pageNo = pageNumber;
            if (flag) {
                gradeBtn(pageNo);
            } else {
                loadGrade(pageNo);
            }
        });
        let gradeBtn = function (pageNo) {
            flag = true;
            let cname = $("#cno").val().trim();
            let ctype = $("#ctype2").val().trim();
            let tno = $("#tno").val().trim();
            let csno = $("#sno").val().trim();
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
                url: "grade/admin/btn?page=" + pageNo,
                contentType: 'application/json',
                data: JSON.stringify({
                    "cname": cname,
                    "ctype": ctype,
                    "tno": tno,
                    "sno": csno,
                    "compare": compare
                }),
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    if (response.code == 0) {
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
                                "                                <td>" + grades1[i].sname + "</td>\n" +
                                "                                <td>" + grades1[i].sno + "</td>\n" +
                                "                                <td>" + grades1[i].score + "</td>\n" +
                                "                                <td>" + grades1[i].credit + "</td>\n" +
                                "                                <td>" + grades1[i].ctype + "</td>\n" +

                                "                                <td></td>\n" +
                                "                            </tr>");
                        }
                        ;
                        $("#gradePageText").html("一共" + pageNum1 + "页,当前第" + pageNo + "页");
                        editable3();
                    }
                }
            })
        };
        loadGrade(pageNo);
        $("#gradeBtn").on("click", function () {
            pageNo = 1;
            gradeBtn(pageNo);
        });
        $("#addGrade").on("click", function () {
            let cno = $("#cno2").val().trim();
            let sno = $("#sno2").val().trim();
            let degree = $("#degree2").val();
            if(cno == ""||sno == ""||degree == ""){
                alert("请填写完整信息");
            }
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
                        loadGrade(pageNum);
                    } else {
                        alert(" 成绩录入失败");
                    }
                },
                error:function(){
                    alert("输入重复成绩");
                }
            })
        });
        $("#analyseBtn").on("click", function () {
            $.ajax({
                type: 'get',
                url: "/grade/analyse/all",
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
                                labels: ['平均分', '最高分', '最低分', '优秀率(>80)', '良好率(60-80)', '不及格率(<60)'],
                                datasets: [{
                                    label: 'Score analysis',
                                    data: [avgGra, maxGra, minGra, excellenceGra, goodGra, failGra],
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
                                    fontSize: 20
                                }
                            }
                        });
                        $("#analyseCouBtn").on("click", function () {
                            let cname = $("#cname1").val().trim();
                            // alert(cname);
                            $.ajax({
                                type: 'get',
                                url: "/grade/analyse?cname=" + cname,
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
                                        removeData(myChart);
                                        removeData(myChart);
                                        removeData(myChart);
                                        removeData(myChart);
                                        removeData(myChart);
                                        removeData(myChart);
                                        addData(myChart, "平均分", avgGra);
                                        addData(myChart, "最高分", maxGra);
                                        addData(myChart, "最低分", minGra);
                                        addData(myChart, "优秀率(>80)", excellenceGra);
                                        addData(myChart, "良好率(60-80)", goodGra);
                                        addData(myChart, "不及格率(<60)", failGra);
                                        updateConfigByMutating(myChart, cname);
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
        });

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

        function updateConfigByMutating(chart, title) {
            chart.options.title.text = title;
            chart.update();
        }

    })

});