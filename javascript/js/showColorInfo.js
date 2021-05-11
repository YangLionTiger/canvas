function showColorInfo(canvas, img, scalePower) {
  // let canvas=document.getElementById("canvas");
  let context = canvas.getContext('2d');
  let imgData = null;
  let pixels = [];
  img.style.display = "block";
  let canvasWidth = 0;
  let canvasHeight = 0;
  let offsetLeft;
  let offsetTop;
  let scrollTop;

  img.addEventListener("load", function () {
    canvas.width = img.clientWidth * scalePower;
    canvas.height = img.clientHeight * scalePower;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    console.log(canvasWidth);
  })
  img.addEventListener("load", function () {
    context.drawImage(img, 0, 0, canvasWidth, canvasHeight)
    this.style.display = "none";
    offsetTop = canvas.offsetTop;
    offsetLeft = canvas.offsetLeft;
    imgData = context.getImageData(0, 0, canvasWidth, canvasHeight)
    let imgDataArray = imgData.data;
    for (let i = 0; i < imgDataArray.length; i += 4) {
      pixels.push({
        r: imgDataArray[i],
        g: imgDataArray[i + 1],
        b: imgDataArray[i + 2],
        a: imgDataArray[i + 3],
        xCoordinate: (i / 4) % canvasWidth + offsetLeft,
        yCoordinate: offsetTop + Math.floor(((i / 4) / canvasWidth))
      })
    }
    console.log(pixels[0]);
    // console.log(imgData);
  })
  function printRBGa(r, g, b, a, xCoordinate, yCoordinate) {
    console.log(`R:${r}\nG:${g}\nB:${b}\na:${a}\nX:${xCoordinate},Y:${yCoordinate}`);
  }

  // canvas.addEventListener("click",function(event){
  //   // console.log(eventType)

  // })
  canvas.addEventListener("click", function (event) {
    scrollTop = Number.parseInt(document.documentElement.scrollTop, 0);
    printRBGa(pixels[(event.clientY + scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft].r,
      pixels[(event.clientY + scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft].g,
      pixels[(event.clientY + scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft].b,
      pixels[(event.clientY + scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft].a,
      event.clientX,
      event.clientY + scrollTop)
  })
}
