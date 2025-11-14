let toggleNavStatus = false;

let slideProfileBar = ()=> {

    let profileWrapper = document.querySelector(".profile");
    let profileH1 = document.querySelector(".profile h1");
    let profileH4 = document.querySelector(".profile h4");
    let profileP = document.querySelector(".profile p");
    let profileWrapperInput = document.querySelector(".input");
    let profilePhoto = document.querySelector(".profile-photo");
    let profileCoverPhoto = document.querySelector(".cover-photo");
    let fixedNavigationBar = document.querySelector(".main-navigation-bar");

    


    if (toggleNavStatus == false) {
        profileWrapper.style.height = "100vh";
        profileWrapper.style.opacity = "1";
        profileWrapper.style.visibility = "visible";
        profileH1.style.opacity = "1";
        profileH1.style.visibility = "visible";
        profileH4.style.opacity = "1";
        profileH4.style.visibility = "visible";
        profileP.style.opacity = "1";
        profileP.style.visibility = "visible";
        profileWrapperInput.style.opacity = "1";
        profileWrapperInput.style.visibility = "visible";
        profilePhoto.style.opacity = "1";
        profilePhoto.style.visibility = "visible";
        profileCoverPhoto.style.opacity = "1";
        profileCoverPhoto.style.visibility = "visible";
        fixedNavigationBar.style.opacity = "0";



        toggleNavStatus = true;
        

    } else if (toggleNavStatus == true) {
        profileWrapper.style.height = "0vh";
        profileWrapper.style.opacity = "0";
        profileWrapper.style.visibility = "hidden";
        profileH1.style.opacity = "0";
        profileH1.style.visibility = "hidden";
        profileH4.style.opacity = "0";
        profileH4.style.visibility = "hidden";
        profileP.style.opacity = "0";
        profileP.style.visibility = "hidden";
        profileWrapperInput.style.opacity = "0";
        profileWrapperInput.style.visibility = "hidden";
        profilePhoto.style.opacity = "0";
        profilePhoto.style.visibility = "hidden";
        profileCoverPhoto.style.opacity = "0";
        profileCoverPhoto.style.visibility = "hidden";
        fixedNavigationBar.style.opacity = "1";


        toggleNavStatus = false;
    }

    }

