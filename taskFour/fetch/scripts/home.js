var collapseBtn = document.getElementById("buttonCollapse")
function toggleText()
{
    collapseBtn.innerText == "Read more..." ? collapseBtn.innerText = "Read less..." : collapseBtn.innerText = "Read more..."
}

collapseBtn.addEventListener("click", toggleText)

