let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
document.getElementById("btnLogout").addEventListener("click", function () {
    //Xử lý logout
    //1. Xóa item có tên userLogin trong localStorage
    localStorage.removeItem("userLogin");
    //2. Điều hướng về trang login
    window.location.href = "login_page.html";
})

function thongKe() {
    let cntCourse = 0;
    let cntClass = 0;
    let cntClassActive = 0;
    let cntClassFinal = 0;
    let cntClassPending = 0;
    let cntStudent = 0;
    studentManagement.forEach(course => {
        cntCourse++;
        course.arrClass.forEach(classItem => {
            cntClass++;
            if (classItem.status == "Hoạt động") {
                cntClassActive++;
            }
            if (classItem.status == "Kết thúc") {
                cntClassFinal++;
            }
            if (classItem.status == "Đang chờ") {
                cntClassPending++;
            }
            classItem.arrStudent.forEach(student => {
                cntStudent++;
            })
        })
    })
    document.getElementById("cntCourse").innerText += cntCourse;
    document.getElementById("cntClass").innerText += cntClass;
    document.getElementById("cntClassActive").innerText += cntClassActive;
    document.getElementById("cntClassFinal").innerText += cntClassFinal;
    document.getElementById("cntClassPending").innerText += cntClassPending;
}
document.getElementById("btnCourseManagement").addEventListener("click", function () {
    window.location.href = "course_page.html";
})
window.load = thongKe();