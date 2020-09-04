function bgplay()
{
    let vd = document.getElementById("vd");
    vd.currentTime = 6;
}
function barblack()
{
    let bar=document.getElementById("topbar");
    const barblack =vd.clientHeight;
    if(window.scrollY > barblack)
    {
        bar.classList.add("bg-dark");
    }
    else if(window.scrollY < barblack)
    {
        bar.classList.remove("bg-dark");
    }
}

function gomuku(target)
{
    if(target != vd)
    {
        let t =$(target).offset().top-30;
        $(window).scrollTop(t);
    }
    else if (target == vd)
    {
        $(window).scrollTop(0);
    }
}

$(document).ready(function(){
    $(".nav-link").click(function(){
      $(".collapse").collapse('hide');
    });
  });
window.addEventListener("scroll",barblack);










console.log("Version : 1.0.9");