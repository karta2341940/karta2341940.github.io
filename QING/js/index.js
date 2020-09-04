function bgplay()
{
    let vd = document.getElementById("vd");
    vd.currentTime = 6;
}
function barblack()
{
    let bar=document.getElementById("topbar");
    const barblack =(bar.offsetTop);
    if(window.scrollY > 0)
    {
        bar.classList.add("bg-dark");
    }
    else if(window.scrollY == 0)
    {
        bar.classList.remove("bg-dark");
    }
}
window.addEventListener("scroll",barblack);























console.log("Version : 1.0.7-1");