$(function() {
    $("#findAllStu").on("click",function () {
        $.ajax({
            type:'get',
            url:"/student/all",
            contentType:'application/json',
            dataType:'json',
            success:function(response) {
                if(response.code == 0){
                    // alert("获取全部学生数据成功");
                    console.log(response);
                    let students = response.data.students;
                    let showStudentHtml="";
                    for(let i = 0; i < students.length; i++) {
                        let n = i+1;
                        html = " <tr>\n" +
                            "                                <td>"+ n +"</td>\n" +
                            "                                <td>"+ students[i].sno +"</td>\n" +
                            "                                <td>"+ students[i].sname +"</td>\n" +
                            "                                <td>"+ students[i].ssex +"</td>\n" +
                            "                                <td>"+ students[i].sage +"</td>\n" +
                            "                                <td>"+ students[i].major +"</td>\n" +
                            "                                <td>"+ students[i].depart +"</td>\n" +
                            "                                <td></td>\n" +
                            "                            </tr>";
                        showStudentHtml += html;
                    };
                    $("#showStu").html(showStudentHtml);
                    var editable = function() {
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
                                                        alert(" 增加成功");
                                                    } else {
                                                        alert(" 增加失败");
                                                    }
                                                }
                                            })
                                        }
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
                    editable();
                    $("#stuBtn").on("click",function () {
                        let sno = $("#sno3").val().trim();
                        let sname = $("#sname3").val().trim();
                        let major = $("#smajor3").val().trim();
                        let depart = $("#sdepart3").val().trim();
                        $.ajax({
                            type: 'post',
                            url: "student/btn",
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
                                if(response.code == 0) {
                                    // alert("获取全部学生数据成功");
                                    console.log(response);
                                    let students = response.data.students;
                                    let showStudentHtml = "";
                                    for (let i = 0; i < students.length; i++) {
                                        let n = i + 1;
                                        html = " <tr>\n" +
                                            "                                <td>" + n + "</td>\n" +
                                            "                                <td>" + students[i].sno + "</td>\n" +
                                            "                                <td>" + students[i].sname + "</td>\n" +
                                            "                                <td>" + students[i].ssex + "</td>\n" +
                                            "                                <td>" + students[i].sage + "</td>\n" +
                                            "                                <td>" + students[i].major + "</td>\n" +
                                            "                                <td>" + students[i].depart + "</td>\n" +
                                            "                                <td></td>\n" +
                                            "                            </tr>";
                                        showStudentHtml += html;
                                    }
                                    ;
                                    $("#showStu").html(showStudentHtml);
                                    editable();
                                }
                            }
                        })
                    })
                } else {
                    alert("获取全部学生数据失败！")
                }

            }
        })


    })
    $("#findAllTea").on("click",function () {
        $.ajax({
            type:'get',
            url:"/teacher/all",
            contentType:'application/json',
            dataType:'json',
            success:function(response) {
                // alert("获取全部教师数据成功");
                if(response.code == 0){
                    console.log(response);
                    let teachers = response.data.teachers;
                    let showTeaHtml="";
                    for(let i = 0; i < teachers.length; i++) {
                        let n = i+1;
                        html = " <tr>\n" +
                            "                                <td>"+ n +"</td>\n" +
                            "                                <td>"+ teachers[i].tno +"</td>\n" +
                            "                                <td>"+ teachers[i].tname +"</td>\n" +
                            "                                <td>"+ teachers[i].tsex +"</td>\n" +
                            "                                <td>"+ teachers[i].tdepart +"</td>\n" +
                            "                                <td></td>\n" +
                            "                            </tr>";
                        showTeaHtml += html;
                    };
                    $("#showTea").html(showTeaHtml);
                    var editable1 = function () {

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
                                                        alert(" 增加成功");
                                                    } else {
                                                        alert(" 增加失败");
                                                    }
                                                }
                                            })
                                        }
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
                    editable1();
                    $("#teaBtn").on("click",function () {
                        let sno = $("#tno2").val().trim();
                        let sname = $("#tname2").val().trim();
                        let depart = $("#tdepart2").val().trim();
                        let cname = $("#tclass2").val().trim();
                        $.ajax({
                            type: 'post',
                            url: "teacher/btn",
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "tno": sno,
                                "tname": sname,
                                "tdepart": depart,
                                "cname":cname
                            }),
                            dataType: 'json',
                            success: function (response) {
                                if(response.code == 0) {
                                    console.log(response);
                                    let teachers = response.data.teachers;
                                    let showTeaHtml = "";
                                    for (let i = 0; i < teachers.length; i++) {
                                        let n = i + 1;
                                        html = " <tr>\n" +
                                            "                                <td>" + n + "</td>\n" +
                                            "                                <td>" + teachers[i].tno + "</td>\n" +
                                            "                                <td>" + teachers[i].tname + "</td>\n" +
                                            "                                <td>" + teachers[i].tsex + "</td>\n" +
                                            "                                <td>" + teachers[i].tdepart + "</td>\n" +
                                            "                                <td></td>\n" +
                                            "                            </tr>";
                                        showTeaHtml += html;
                                    }
                                    ;
                                    $("#showTea").html(showTeaHtml);
                                    editable1();
                                }
                            }
                        })
                    })
                } else {
                    alert("服务器据出错啦！")
                }

            }
        })

    })
    $("#findAllCou").on("click",function () {
        $.ajax({
            type:'get',
            url:"/course/all",
            contentType:'application/json',
            dataType:'json',
            success:function(response) {
                // alert("获取全部课程数据成功");
                if(response.code == 0){
                    console.log(response);
                    let courses = response.data.courses;
                    let showCouHtml="";
                    for(let i = 0; i < courses.length; i++) {
                        let n = i+1;
                        html = " <tr>\n" +
                            "                                <td>"+ n +"</td>\n" +
                            "                                <td>"+ courses[i].cno +"</td>\n" +
                            "                                <td>"+ courses[i].cname +"</td>\n" +
                            "                                <td>"+ courses[i].ctype +"</td>\n" +
                            "                                <td>"+ courses[i].credit +"</td>\n" +
                            "                                <td>"+ courses[i].ctime +"</td>\n" +
                            "                                <td></td>\n" +
                            "                            </tr>";
                        showCouHtml += html;
                    };
                    $("#showClass").html(showCouHtml);
                    var editable2 = function() {
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
                                            alert(" 增加成功");
                                        } else {
                                            alert(" 增加失败");
                                        }
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
                    }
                    editable2();
                    $("#couBtn").on("click",function () {
                        // alert("点击啦");
                        let cno = $("#cno1").val().trim();
                        let cname = $("#cname").val().trim();
                        let ctype = $("#ctype1").val().trim();
                        let tno = $("#cteacher1").val().trim();
                        let csno = $("#csno").val().trim();
                        $.ajax({
                            type: 'post',
                            url: "course/btn",
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "cno": cno,
                                "cname": cname,
                                "ctype": ctype,
                                "tno":tno,
                                "sno":csno
                            }),
                            dataType: 'json',
                            success: function (response) {
                                // alert(cname);
                                if(response.code == 0){
                                    console.log(response);
                                    let courses = response.data.courses;
                                    let showCouHtml="";
                                    for(let i = 0; i < courses.length; i++) {
                                        let n = i+1;
                                        html = " <tr>\n" +
                                            "                                <td>"+ n +"</td>\n" +
                                            "                                <td>"+ courses[i].cno +"</td>\n" +
                                            "                                <td>"+ courses[i].cname +"</td>\n" +
                                            "                                <td>"+ courses[i].ctype +"</td>\n" +
                                            "                                <td>"+ courses[i].credit +"</td>\n" +
                                            "                                <td>"+ courses[i].ctime +"</td>\n" +
                                            "                                <td></td>\n" +
                                            "                            </tr>";
                                        showCouHtml += html;
                                    };
                                    $("#showClass").html(showCouHtml);
                                    editable2();
                                }
                            }
                        })
                    })
                } else {
                    alert("服务器据出错啦！")
                }

            }
        })

    })
    $("#findAllGra").on("click",function () {
        $.ajax({
            type:'get',
            url:"/grade/all",
            contentType:'application/json',
            dataType:'json',
            success:function(response) {
                // alert("获取全部成绩数据成功");
                if(response.code == 0){
                    console.log(response);
                    let grades = response.data.grades;
                    let showGraHtml="";
                    for(let i = 0; i < grades.length; i++) {
                        let n = i+1;
                        html = " <tr>\n" +
                            "                                <td>"+ n +"</td>\n" +
                            "                                <td>"+ grades[i].cno +"</td>\n" +
                            "                                <td>"+ grades[i].cname +"</td>\n" +
                            "                                <td>"+ grades[i].sname +"</td>\n" +
                            "                                <td>"+ grades[i].sno +"</td>\n" +
                            "                                <td>"+ grades[i].score +"</td>\n" +
                            "                                <td>"+ grades[i].credit +"</td>\n" +
                            "                                <td>"+ grades[i].ctype +"</td>\n" +

                            "                                <td></td>\n" +
                            "                            </tr>";
                        showGraHtml += html;
                    };
                    $("#showGrade").html(showGraHtml);
                    var editable3 = function() {
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
                    editable3();
                    $("#gradeBtn").on("click",function () {
                        // alert("点击啦");
                        let cname = $("#cno").val().trim();
                        let ctype = $("#ctype2").val().trim();
                        let tno = $("#tno").val().trim();
                        let csno = $("#sno").val().trim();
                        let showType = $("#showType").val().trim();
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
                            url: "grade/admin/btn",
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "cname": cname,
                                "ctype": ctype,
                                "tno":tno,
                                "sno":csno,
                                "compare":compare
                            }),
                            dataType: 'json',
                            success: function (response) {
                                // alert(cname);
                                if(response.code == 0){
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
                                            "<td></td>"
                                        "                            </tr>";
                                        showGraHtml += html;
                                    };
                                    $("#showGrade").html(showGraHtml);
                                    editable3();
                                }
                            }
                        })
                    })
                    $("#addGrade").on("click",function () {
                        let cno = $("#cno2").val().trim();
                        let sno = $("#sno2").val().trim();
                        let degree = $("#degree2").val();
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
                                        type:'get',
                                        url:"/grade/all",
                                        contentType:'application/json',
                                        dataType:'json',
                                        success:function(response) {
                                            // alert("获取全部成绩数据成功");
                                            if(response.code == 0){
                                                console.log(response);
                                                let grades = response.data.grades;
                                                let showGraHtml="";
                                                for(let i = 0; i < grades.length; i++) {
                                                    let n = i+1;
                                                    html = " <tr>\n" +
                                                        "                                <td>"+ n +"</td>\n" +
                                                        "                                <td>"+ grades[i].cno +"</td>\n" +
                                                        "                                <td>"+ grades[i].cname +"</td>\n" +
                                                        "                                <td>"+ grades[i].sname +"</td>\n" +
                                                        "                                <td>"+ grades[i].sno +"</td>\n" +
                                                        "                                <td>"+ grades[i].score +"</td>\n" +
                                                        "                                <td>"+ grades[i].credit +"</td>\n" +
                                                        "                                <td>"+ grades[i].ctype +"</td>\n" +

                                                        "                                <td></td>\n" +
                                                        "                            </tr>";
                                                    showGraHtml += html;
                                                };
                                                $("#showGrade").html(showGraHtml);
                                                editable3();
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
                    $("#analyseBtn").on("click",function () {
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
                                                        max:100
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
                                    $("#analyseCouBtn").on("click",function () {
                                        let cname = $("#cname1").val().trim();
                                        alert(cname);
                                        $.ajax({
                                            type: 'get',
                                            url: "/grade/analyse?cname="+cname,
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
                } else {
                    alert("服务器据出错啦！")
                }

            }
        })

    });

});