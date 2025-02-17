//当页面已经向下滚动时,将header置为半透明
document.addEventListener('DOMContentLoaded', function(){
    var header = document.querySelector('header');
    function toggleHeaderTransparency(){
        if(window.scrollY > 0){
            header.style.opacity = '0.75';
        }
        else{
            header.style.opacity = '1';
        }
    }

    toggleHeaderTransparency();
    window.addEventListener('scroll', toggleHeaderTransparency);
});