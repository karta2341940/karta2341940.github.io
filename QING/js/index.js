let vwbool=1;

$(document).ready(function(){

    let bar=document.getElementById("topbar");
    if( $(window).width() < 767 )
    {
        bar.classList.add("bg-dark");
        vwbool=0;
    }

    $(".nav-link").click(function(){$(".collapse").collapse('hide');});

});

function bgplay()
{
    let vd = document.getElementById("vd");
    vd.currentTime = 6;
}

function barblack()
{
    if(vwbool)
    {
        let bar=document.getElementById("topbar");
        const barblack =vd.clientHeight;
        if(window.scrollY > barblack-65)
        {
            bar.classList.add("bg-dark");
        }
        else if(window.scrollY < barblack)
        {
            bar.classList.remove("bg-dark");
        }
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


window.addEventListener("scroll",barblack);










console.log("Version : 1.1.1");
console.log("Changed : 55px");