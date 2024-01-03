window.onload = function () {
  let button = document.getElementById("switch") as HTMLButtonElement;
  let headvalue = document.querySelector("head") as HTMLHeadElement;
  let link = document.createElement("link");
  let style = 0;

  const switcher = () => {
    var firstLink = document.getElementsByTagName("link")[0];
    firstLink.parentNode.removeChild(firstLink);
    if (style == 1) {
      headvalue.appendChild(link);
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "css/1.css");
      link.setAttribute("type", "text/css");
    } else {
      headvalue.appendChild(link);
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "css/2.css");
      link.setAttribute("type", "text/css");
    }

    if (style == 1) {
      style = 2;
    } else {
      style = 1;
    }
  };

  button.addEventListener("click", switcher);
};
