document.addEventListener('DOMContentLoaded',function(){
   const dino= document.querySelector('.dino')
    const grid=document.querySelector('.grid')
    const alert=document.getElementById('alert')
    let gravity=0.9
    let isJumping=false
    let isGameOver=false
    function control(e)
    {
        if(e.code=="Space")
            jump()
    }
    document.addEventListener('keydown',control)
    let position=0;
    function jump()
    {
        isJumping=true
        let count=0
        let timerID=setInterval(function(){
            //move up
            if(count===15){
                clearInterval(timerID)
                let downtimerID=setInterval(function(){
                    if(count===0)
                    {
                        clearInterval(downtimerID)
                        isJumping=false
                    }
                    position+=15
                    count--
                    position*=gravity
                    dino.style.top=position+'px'
                },20)
            }
            position-=20
            count++
            position=position*gravity
            dino.style.top=position+'px'
        },20)
    }
    function generateObstacle()
    {
        if(!isGameOver)
        {
        let randomTime=Math.random()*4000
        let obstaclePosition=1000
        const obstacle=document.createElement('div')
        obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left=obstaclePosition + 'px'
        let timerID=setInterval(function(){
            if(obstaclePosition>0 && obstaclePosition<60 && position>=-50){
                clearInterval(timerID)
                alert.innerHTML='Game Over'
                isGameOver=true
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild)
                }
            }
            obstaclePosition-=5
            obstacle.style.left=obstaclePosition+'px'
        })
        setTimeout(generateObstacle,randomTime)
        }
        
    }
    
    generateObstacle()

})