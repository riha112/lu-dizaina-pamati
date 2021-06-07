function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

let prev = {x: 0, y: 0};
let canLoad = true;
let count = 0;
let foots = [];
setInterval(() => canLoad = true, 200);

document.addEventListener("mousemove", (e) => {
    if (!canLoad || count > 500) return;

    if (foots.length < 20) {
        let newFoot = document.createElement("div");
        newFoot.classList.add("foot")
        newFoot.classList.add((count % 2 == 0) ? "even" : "odd");
        document.body.appendChild(newFoot);
        foots.push(newFoot);
    }

    let foot = foots[count % 20];
    let relX = window.pageXOffset + e.clientX;
    let relY = window.pageYOffset + e.clientY;
    foot.style.left = `${relX}px`;
    foot.style.top = `${relY}px`;
    foot.style.transform = `rotate(${angle(relX, relY, prev.x, prev.y) - 90}deg)`;
    prev = {
        x: relX,
        y: relY
    };

    canLoad = false;
    count ++;
});