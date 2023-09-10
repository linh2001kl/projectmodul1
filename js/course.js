// số item 1 trang
let maxPageItem = 5;
let nowPage = 0;

function renderPageItem() {
  let pageCount = Math.ceil(JSON.parse(localStorage.getItem("studentManagement") ?? "[]").length / maxPageItem);
  let elPageBox = document.getElementById("page_box");
  let dataString = ``;
  for (let i = 1; i <= pageCount; i++) {
    dataString += `
      <span class="page_item" onclick="pageChange('${i}')" style="cursor: pointer; margin-right: 5px;">${i}</span>
    `
  }
  elPageBox.innerHTML=dataString;
}

function colorPage(pageNumber) {
  let pageElList = document.querySelectorAll(".page_item");
  for(let i in pageElList) {
    if(i == "entries") break
    if(Number(i) + 1 == pageNumber) {
      pageElList[i].classList.add("pageActive")
    }else {
      pageElList[i].classList.remove("pageActive")
    }
  }
}

function pageChange(pageNumber) {
  let courses = JSON.parse(localStorage.getItem("studentManagement") ?? "[]");
  let data = [];
  for(let i in courses) {
    if(Number(i) >= ((Number(pageNumber) * maxPageItem) - maxPageItem)) {
      if(data.length == maxPageItem) break
      data.push(courses[i])
    }
  }
  nowPage = pageNumber;
  renderData(data)
  colorPage(nowPage)
}

renderPageItem();
pageChange(1)
colorPage(1)


let studentManagement =
  JSON.parse(localStorage.getItem("studentManagement")) || [];
document.getElementById("btnLogout").addEventListener("click", function () {
  //Xử lý logout
  //1. Xóa item có tên userLogin trong localStorage
  localStorage.removeItem("userLogin");
  //2. Điều hướng về trang login
  window.location.href = "login_page.html";
});

//Hàm hiển thị dữ liệu
function renderData(sources) {
  let listCourse = document.getElementById("listCourse");
  listCourse.innerHTML = ""; 
  //forEach(functionCallback,thisValue)
  //functionCallback(element,index,arr)
  sources.forEach((course, index) => {
    listCourse.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${course.courseId}</td>
                <td>${course.courseName}</td>
                <td>${course.courseTime}</td>
                <td>${course.status ? "Hoạt động" : "Không hoạt động"}</td>
                <td>
                <i class="fa-solid fa-pen-to-square" id="editCourse"></i>
                <button class="btn btn-primary" onclick=initEdit("${course.courseId}") data-bs-toggle="modal" data-bs-target="#updateCourse">Edit</button>
                <i  onclick="deleteCourse('${course.courseId}')" class="fa-solid fa-trash"></i>
                <button onclick="setDataFormDelete('${course.courseId}')" data-bs-toggle="modal" data-bs-target="#deleteCourse")>Delete</button>
                    
                    
                </td>
            </tr>
        `;
  });
  
}

function setDataFormDelete(courseId) {
  let elCofirm = document.getElementById("modalDeleteConfirm");
  elCofirm.addEventListener('click', () => {
    deleteCourse(courseId)
  })
}
// // Hàm thêm mới một danh mục
// function getCourseForm() {
//     let courseId = document.getElementById("courseId").value;
//     let courseName = document.getElementById("courseName").value;
//     let courseTime = document.getElementById("courseTime").value;
//     let status = document.getElementById("active").checked = true;
//     let course = { courseId, courseName, courseTime, status };
//     return course;
// }

//Tạo khóa học mới
var newCourseModal = new bootstrap.Modal(document.getElementById("newCourse"), {
  keyboard: false,
});
document
  .getElementById("btnCreateCourse")
  .addEventListener("click", function () {
    //1. Lấy dữ liệu arrCourse từ localStorage
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    //2. Lấy dữ liệu trên modal
    let courseId = document.getElementById("courseId").value;
    let courseName = document.getElementById("courseName").value;
    let courseTime = document.getElementById("courseTime").value;
    let status =
      document.querySelector("input[type='radio']:checked").value == "true"
        ? true
        : false;
    let newCourse = { courseId, courseName, courseTime, status, arrClass: [] };
    //3. push dư liệu thêm mới vào arrCourse
    arrCourse.push(newCourse);
    //4. Đẩy arrCourse vào localStorage
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    //5. Đóng modal
    document.getElementById("courseId").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("courseTime").value = "";
    document.getElementById("active").checked = true;
    newCourseModal.hide();
    //6. render lại dữ liệu
    renderPageItem()
    pageChange(nowPage)
  });
  // Hàm resetForm
function resetForm() {
    document.getElementById("courseId").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("courseTime").value = "";
    document.getElementById("active").checked = true;
}
// Hàm edit dữ liệu khóa học
var updateCourseModal = new bootstrap.Modal(document.getElementById('updateCourse'), {
    keyboard: false
})
function initEdit(courseId) {
  // 1. Lấy arrCourse từ localStorage
  let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
  // 2. Lấy thông tin danh mục cần cập nhật
  let index = getCatalogById(arrCourse, courseId);
  // 3. Hiển thị thông tin danh mục cần cập nhật lên Input Form
  document.getElementById("courseId2").value = arrCourse[index].courseId;
  document.getElementById("courseId2").readOnly = true;
  document.getElementById("courseName2").value = arrCourse[index].courseName;
  document.getElementById("courseTime2").value = arrCourse[index].courseTime;
  if (arrCourse[index].status == true) {
      document.getElementById("active2").checked = true;
  } else {
      document.getElementById("inActive2").checked = true;
  }
  // 4. Đặt lại cờ
  action = "Edit";
}
// Hàm lấy thông tin danh mục theo mã danh mục
function getCatalogById(arrCourse, courseId) {
    for (let index = 0; index < arrCourse.length; index++) {
        if (arrCourse[index].courseId == courseId) {
            return index;
        }
    }
    return -1;
}
// Hàm cập nhật danh mục

document.getElementById("btnUpdateCourse").addEventListener("click", function () {
    // 1. Lấy arrCourse từ localStorage
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    //2. Lấy dữ liệu trên modal
    let courseId = document.getElementById("courseId2").value;
    let courseName = document.getElementById("courseName2").value;
    let courseTime = document.getElementById("courseTime2").value;
    let status =
      document.querySelector("input[type='radio']:checked").value == "true"
        ? true
        : false;
    let updateCourse = { courseId, courseName, courseTime, status, arrClass: [] };
    // 3. Cập nhật updateCourse trong arrCourse
    // 3.1. Lấy chỉ số phần tử cần cập nhật
    let index = getCatalogById(arrCourse, updateCourse.courseId);
    // 3.2. Cập nhật
    if (index > -1) {
        arrCourse[index] = updateCourse;
    }
    // 4. set arrCourse vào localStorage
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    // 5. đặt lại cờ action
    action = "Create";
    // 6. resetForm
    resetForm();
    // 7. Đặt lại courseId readOnly
    document.getElementById("courseId").readOnly = false;
    // 8. renderData table
    pageChange(nowPage)
    renderPageItem()
})

// Hàm xóa danh mục sản phẩm
function deleteCourse(courseId) {
    let course = JSON.parse(localStorage.getItem("studentManagement") ?? "[]"); // lấy danh course tren local, nếu không có thì lấy mãng rỗng.
    // set lại giá trị mới cho course trên local bằng chính nó lọc đi những thằng có ID trùng với courseId muốn xóa
    localStorage.setItem("studentManagement", JSON.stringify(course.filter(item => item.courseId != courseId)))
    // load lại dữ liệu
    pageChange(nowPage)
    renderPageItem()
    // // 1. Lấy dữ liệu arrCourse từ localStorage
    // let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    // // 2. Xóa catalog trong arrCourse theo courseId
    // let index = getCatalogById(arrCourse, courseId);
    // arrCourse.splice(index, 1);
    // // 3. set arrCourse vào localStorage
    // localStorage.setItem("studenManagement", JSON.stringify(arrCourse));
    // // 4. render Data
    // renderData(1, arrCourse);

}

window.onload = pageChange(nowPage)



//hàm phân trang 
btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  // 1. Lấy arrCourse từ localStorage
  let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
  // 2. Lấy dữ liệu nhập trên ô tìm kiếm
  let courseNameSearch = document.getElementById("searchCourseName").value;
  // 3. tìm các danh mục có tên chứa courseNameSearch
  // Tìm hiểu về hàm filter
  let listCourseSearch = arrCourse.filter(course => course.courseName.includes(courseNameSearch));
  // 4. render data
  renderData(1, listCourseSearch);
})
// Hàm sắp xếp danh mục
function handSortCatalog() {
  // 1. Lấy tiêu chí sắp xếp
  let sortTarget = document.getElementById("sort").value;
  // 2. Lấy arrCourse từ localStorage
  let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
  // 3. Sắp xếp theo các tiêu chí
  switch (sortTarget) {
      case "courseNameABC":
          // sắp xếp theo tên danh mục tăng dần: sử dụng hàm sort (tìm hiểu thêm)
          arrCourse.sort((a, b) => (a.courseName > b.courseName) ? 1 : (a.courseName < b.courseName) ? -1 : 0);
          break;
      case "courseNameDESC":
          // Sắp xếp theo tên danh mục giảm dần
          arrCourse.sort((a, b) => (a.courseName > b.courseName) ? -1 : (a.courseName < b.courseName) ? 1 : 0);
          break;
      case "priorityASC":
          // Sắp xếp theo độ ưu tiên tăng dần
          arrCourse.sort((a, b) => a.courseTime - b.courseTime);
          break;
      case "priorityDESC":
          // Sắp xếp theo độ ưu tiên giảm dần
          arrCourse.sort((a, b) => b.courseTime - a.courseTime);
          break;
  }
  // 4. set vào trong localStorage
  localStorage.setItem("studenManagement", JSON.stringify(arrCourse));
  // 5. render Data
  renderData(1, arrCourse);
}

document.onload = renderData;

