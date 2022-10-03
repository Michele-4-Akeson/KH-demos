function manipShapeFill(gsvg,state) {

  const order = [2,4,6,8,1,3,5,7] // Should match keys in dom. 
  //const order = [8,7,1,5,6,3,2,4]

  function shapePointerDown(e){
    !this.filled && gsap.set(this,{fill: "#21BBED"})
    this.filled && gsap.set(this,{fill: "white"})
    this.filled = !this.filled
  }

  let rs = []
  function load() {
    order.forEach(n=>{

      rs.push("r"+n)
      
      const shape = document.getElementById(n)
      gsap.set(shape,{stroke: "#1178b8",fill: "white",strokeLinejoin: "round"})
      shape.addEventListener('pointerdown',shapePointerDown)
    })
  }


  function morph(){
    const T = gsap.timeline()

    order.forEach((n,i)=>{
      let r = "r"+n
      const R = document.getElementById(r)
      const N = document.getElementById(n)
      if (i == 0) {
        T.to(N, {morphSVG:R, duration: 0.5});
      } else {
        T.to(N, {morphSVG:R, duration: 0.5},"-=0.3");
      }
    
    })
    setTimeout(()=>{
      T.reverse()
    },4000)
  }

  load();

  setTimeout(morph,5000)
}
