/**
 * GLOBAL DATA SETTINGS
 */
const GRID_ROW_SIZE = 15
const GRID_COL_SIZE = 30

/**
 * the main representation of the grid, Initializing
 * row: the rownumber 
 * col: the colnumber 
 * State: NULL / Start / End / Wall / Path
 * VisitedAt: (-1: unvisited, >0: step visited)
 */
var Grid = []
for (let i = 0; i < GRID_ROW_SIZE; i++) {
    Grid.push([]);    
    for (let j = 0; j < GRID_COL_SIZE; j++) {
        Grid[i].push({id:i+"-"+j,row:i, col:j, State:"NULL", VisitedAt:-1  })        
        /**
         * the node element is used as a container for the element
         * the inner div element is used to display the animation
         */
    }
}
Grid[0][0].State = "Start"
Grid[GRID_ROW_SIZE -1][GRID_COL_SIZE-1].State = "End"
// for (let i = 0; i < GRID_ROW_SIZE; i++) {    
    // for (let j = 0; j < GRID_COL_SIZE; j++) {
//         console.log(Grid[i][j].row + "-" + Grid[i][j].col + " ")
//     }
// }
var StartPoint = [0,0]
var EndPoint = [GRID_ROW_SIZE -1, GRID_COL_SIZE -1]
var setterMode="Wall"
var mouseDown = false

this.addEventListener("mousedown", e=>{
    console.log("MouseDown")
    mouseDown = true;
})
this.addEventListener("mouseup", e=>{
    console.log("MouseUp")
    mouseDown = false;
})


////////////////// END OF THE DATA SEGMENT ///////////////////////////////////////

////               HELPER FUNCTIONS                                            ///
function consoleGridPrinter(){
    var header = "\\"
    for (let i = 0; i < GRID_COL_SIZE; i++) {
        header += " " + i
    }
    console.log(header)
    for (let i = 0; i < GRID_ROW_SIZE; i++) { 
        var thisline = i + " "   
        for (let j = 0; j < GRID_COL_SIZE; j++) {
            thisline +=  Grid[i][j].State[0] + " "
        }
        console.log(thisline)
    }
}

function consoleVisitPrinter(){
    var header = "\\"
    for (let i = 0; i < GRID_COL_SIZE; i++) {
        header += " " + i
    }
    console.log(header)
    for (let i = 0; i < GRID_ROW_SIZE; i++) { 
        var thisline = i + " "   
        for (let j = 0; j < GRID_COL_SIZE; j++) {
            thisline +=  Grid[i][j].VisitedAt + " "
        }
        console.log(thisline)
    }
}

///////////////////END OF THE HELPER FUNCTIONS ////////////////////////////////////

/**
 * clears the grid, reset all the walls and set the start and end to (0,0) (8,8)
 */
function clearGrid(){
    console.log("clearGrid")
    for (let i = 0; i < GRID_ROW_SIZE; i++) {    
        for (let j = 0; j < GRID_COL_SIZE; j++) {
            Grid[i][j].State = "NULL"
            Grid[i][j].VisitedAt = -1
            document.getElementById(Grid[i][j].id).innerHTML="";
    
        }
    }
    Grid[0][0].State = "Start"
    Grid[GRID_ROW_SIZE-1][GRID_COL_SIZE-1].State = "End"
    document.getElementById(Grid[0][0].id).innerHTML="<div class='startpoint'></div>";
    document.getElementById(Grid[GRID_ROW_SIZE-1][GRID_COL_SIZE-1].id).innerHTML="<div class='endpoint'></div>";
    
}

/**
 * clears the gird but saves the wall
 */
function clearGridSaveWall(){
    for (let i = 0; i < GRID_ROW_SIZE; i++) {    
        for (let j = 0; j < GRID_COL_SIZE; j++) {
            let State = Grid[i][j].State;
            if(State == "Wall" || State == "Start" || State == "End"){
                continue;
            }
            Grid[i][j].State = "NULL"
            Grid[i][j].VisitedAt = -1
            document.getElementById(Grid[i][j].id).innerHTML="";
        }
    }
    
}

/**
 * the function that sets the start, will override walls but will not override end
 */
function setStart(rownum,colnum){
    //TODO: Gather the row/col number from the user
    // var rownum = 0
    // var colnum = 0
    //TODO: preset here, need modification
    if(rownum < 0 || rownum >= GRID_ROW_SIZE || colnum < 0 || colnum >= GRID_COL_SIZE){
        console.log("Invalid number: data out of bound")
    }
    if(rownum == EndPoint[0] && colnum == EndPoint[1]){
        // cannot override endpoint
        return
    }
    Grid[StartPoint[0]][StartPoint[1]].State = "NULL"
    document.getElementById(Grid[StartPoint[0]][StartPoint[1]].id).innerHTML="";

    Grid[rownum][colnum].State = "Start"
    document.getElementById(Grid[rownum][colnum].id).innerHTML="<div class='"+setterMode+"'></div>";
    StartPoint = [rownum,colnum]



    return

}

/**
 * the function that sets the end, will override walls but will not override end
 */
function setEnd(rownum,colnum){
    //TODO: Gather the row/col number from the user
    // var rownum = GRID_ROW_SIZE-1
    // var colnum = GRID_COL_SIZE-1
    //TODO: preset here, need modification
    if(rownum < 0 || rownum >= GRID_ROW_SIZE || colnum < 0 || colnum >= GRID_COL_SIZE){
        console.log("Invalid number: data out of bound")
    }
    if(rownum == StartPoint[0] && colnum == StartPoint[1]){
        // cannot override startpoint
        return
    }
    Grid[EndPoint[0]][EndPoint[1]].State = "NULL"
    document.getElementById(Grid[EndPoint[0]][EndPoint[1]].id).innerHTML="";

    Grid[rownum][colnum].State = "End"
    document.getElementById(Grid[rownum][colnum].id).innerHTML="<div class='"+setterMode+"'></div>";
    EndPoint = [rownum,colnum]
    return

}

/**
 * the function that sets the wall, will not override start/end
 */
function setWall(rownum,colnum){
    //TODO: Gather the row/col number from the user
    // var rownum = 4
    // var colnum = 4
    //TODO: preset here, need modification
    if(rownum < 0 || rownum >= GRID_ROW_SIZE || colnum < 0 || colnum >= GRID_COL_SIZE){
        console.log("Invalid number: data out of bound")
    }
    if(rownum == StartPoint[0] && colnum == StartPoint[1]){
        // cannot override startpoint
        return
    }
    if(rownum == EndPoint[0] && colnum == EndPoint[1]){
        // cannot override endPoint
        return
    }
    Grid[rownum][colnum].State = "Wall"
    document.getElementById(Grid[rownum][colnum].id).innerHTML="<div class='"+setterMode+"'></div>";
    console.log("setWall")
    // document.getElementById(nodeName).style.backgroundColor="black";
    return

}

/** 
 * the function that reset all visit states in the grid, execute before the actual algorithms
 */
function resetVisit(){
    for (let i = 0; i < GRID_ROW_SIZE; i++) {    
        for (let j = 0; j < GRID_COL_SIZE; j++) {
            Grid[i][j].VisitedAt = -1
        }
    } 
}


/** 
 * the BFS visit method, will give a path using BFS from start to end 
 * or show message that a path cannot be reached
 */
function BFS(){
    clearGridSaveWall()
    resetVisit()
    //setting the startpoint to 0 to initiate the BFS
    Grid[StartPoint[0]][StartPoint[1]].VisitedAt = 0;
    var modifiedThisRound = true
    //the variable that indicates the current round for finding
    var roundIndicator = 0
    var found = false

    


    while(modifiedThisRound == true){
        if(roundIndicator >= (GRID_ROW_SIZE*GRID_COL_SIZE + 1)){
            break
        }
        roundIndicator  += 1
        modifiedThisRound = false
        for (let i = 0; i < GRID_ROW_SIZE; i++) {    
            if(found){
                break
            }
            for (let j = 0; j < GRID_COL_SIZE; j++) {
                if(Grid[i][j].VisitedAt != -1){
                    continue;
                }
                if (Grid[i][j].State == "Wall") {
                    continue;
                }
                if(i>0){
                    if(Grid[i-1][j].VisitedAt == roundIndicator-1){
                        modifiedThisRound = true
                        Grid[i][j].VisitedAt = roundIndicator
                        if(i == EndPoint[0] && j == EndPoint[1]){
                            found = true
                            break;
                        }
                        document.getElementById(Grid[i][j].id).innerHTML = "<div id='explored"+i+"x"+j+"' class='explored'></div>"
                        document.getElementById("explored"+i+"x"+j).style.animationDelay=roundIndicator/5+"s"
                        
                    }
                }
                if(i<GRID_ROW_SIZE-1){
                    if(Grid[i+1][j].VisitedAt == roundIndicator-1){
                        modifiedThisRound = true
                        Grid[i][j].VisitedAt = roundIndicator
                        if(i == EndPoint[0] && j == EndPoint[1]){
                            found = true
                            break;
                        }
                        document.getElementById(Grid[i][j].id).innerHTML = "<div id='explored"+i+"x"+j+"' class='explored'></div>"
                        document.getElementById("explored"+i+"x"+j).style.animationDelay=roundIndicator/5+"s"
                        
                    }
                }
                if(j>0){
                    if(Grid[i][j-1].VisitedAt == roundIndicator-1){
                        modifiedThisRound = true
                        Grid[i][j].VisitedAt = roundIndicator
                        
                        if(i == EndPoint[0] && j == EndPoint[1]){
                            found = true
                            break;
                        }
                        document.getElementById(Grid[i][j].id).innerHTML = "<div id='explored"+i+"x"+j+"' class='explored'></div>"
                        document.getElementById("explored"+i+"x"+j).style.animationDelay=roundIndicator/5+"s"
                    }
                }
                if(j<GRID_COL_SIZE-1){
                    if(Grid[i][j+1].VisitedAt == roundIndicator-1){
                        modifiedThisRound = true
                        Grid[i][j].VisitedAt = roundIndicator
                        if(i == EndPoint[0] && j == EndPoint[1]){
                            found = true
                            break;
                        }
                        document.getElementById(Grid[i][j].id).innerHTML = "<div id='explored"+i+"x"+j+"' class='explored'></div>"
                        document.getElementById("explored"+i+"x"+j).style.animationDelay=roundIndicator/5+"s"
                        
                    }
                }



            }
        }


    }
    /// end of the search, return path or not found

    if(!found){
        console.log("End of search, not found")
        alert("No possible route found")
        return
    }
    console.log("Found at round: " + roundIndicator)


    var counter = 0
    var myInterval = setInterval(() => {
        if(counter < 1000*roundIndicator/5){
            counter+= 100
        }
        else{
            pathGatherer()
            clearInterval(myInterval)
        }
    }, 100);



}

/**
 * gather the path using the information stored in the grid
 */
function pathGatherer(){
    var indicator = Grid[EndPoint[0]][EndPoint[1]].VisitedAt
    var currentPoint = [EndPoint[0],EndPoint[1]]
    var path = []

    while( indicator != 0){
        console.log(indicator)
        console.log("Current: " + currentPoint[0] + "-" + currentPoint[1])
        if(currentPoint[0]!=EndPoint[0] | currentPoint[1]!=EndPoint[1]){
            console.log(currentPoint,"not equal to",EndPoint)
            document.getElementById(Grid[currentPoint[0]][currentPoint[1]].id).innerHTML="<div id='path"+currentPoint[0]+"x"+currentPoint[1]+"' class='path'></div>";
            document.getElementById("path"+currentPoint[0]+"x"+currentPoint[1]).style.animationDelay=indicator/15+"s"
        }
        
        Grid[currentPoint[0]][currentPoint[1]].State = "Path"
        //update, find the 
        indicator -= 1
        //-x NORTH
        if(currentPoint[0] > 0){
            if(Grid[currentPoint[0]-1][currentPoint[1]].VisitedAt == indicator){
                path.push([currentPoint[0],currentPoint[1],"NORTH"])
                currentPoint[0] -= 1
                continue
            }
            
        }
        //+x SOUTH
        if(currentPoint[0] < GRID_ROW_SIZE-1){
            if(Grid[currentPoint[0]+1][currentPoint[1]].VisitedAt == indicator){
                path.push([currentPoint[0],currentPoint[1],"SOUTH"])
                currentPoint[0] += 1
                continue
            }
            
        }
        //-y WEST
        if(currentPoint[1] > 0){
            if(Grid[currentPoint[0]][currentPoint[1]-1].VisitedAt == indicator){
                path.push([currentPoint[0],currentPoint[1],"WEST"])
                currentPoint[1] -= 1
                continue
            }
            
        }
        //+y EAST
        if(currentPoint[1] < GRID_COL_SIZE-1){
            if(Grid[currentPoint[0]][currentPoint[1]+1].VisitedAt == indicator){
                path.push([currentPoint[0],currentPoint[1],"EAST"])
                currentPoint[1] += 1
                continue
            }
            
        }

    }
    //!! the path is the REVERSE PATH from the END to the START 
    Grid[EndPoint[0]][EndPoint[1]].State = "End"
    console.log(path)
    consoleGridPrinter()
}

/**
 * select the algorithm to be performed
 */
function toggleAlgo(algoName){
    document.getElementById("algoIndicator").innerHTML=algoName;
    console.log(algoName)
}
/**
 * select setter mode
 */
function toggleSetterMode(setterName){
    document.getElementById("setterModeIndicator").innerHTML="Set "+setterName
    setterMode=setterName
    console.log(setterName)
}

/**
 * reads which algorithm to be performed and execute it
 */
function selectAlgo(){
    var algoName=document.getElementById("algoIndicator").innerHTML
    if(algoName=="Select Algorithm"){
        alert("Please Select an Algorithm")
        return
    }
    if(algoName=="BFS"){
        BFS()
    }
    if(algoName == "Dijkstra"){
        Dijkstra()
    }
}

/**
 * initialize the graph in html and add listeners to each of the nodes
 */
function initializeGraph(){
    console.log("initializing graph")
    var tempHTML=""
    for (let i = 0; i < GRID_ROW_SIZE; i++) {    
        for (let j = 0; j < GRID_COL_SIZE; j++) {
            tempHTML+="<node id=\"" + Grid[i][j].id + "\" data-row=\"" + i + "\" data-column=\""+ j + "\"></node>"
        }
        tempHTML+="<br></br>"
    }
    
    document.getElementById("graphWrapper").innerHTML=tempHTML;
    for (let i = 0; i < GRID_ROW_SIZE; i++) {    
        for (let j = 0; j < GRID_COL_SIZE; j++) {
            document.getElementById(Grid[i][j].id).addEventListener("click", setNode)
            document.getElementById(Grid[i][j].id).addEventListener("mouseover",toggleRedirect)
            document.getElementById(Grid[i][j].id).addEventListener("mouseup",e=>{
                console.log("MouseUp")
                mouseDown = false;
            })
        }
    }
    document.getElementById(Grid[0][0].id).innerHTML="<div class='startpoint'></div>";
    document.getElementById(Grid[GRID_ROW_SIZE-1][GRID_COL_SIZE-1].id).innerHTML="<div class='endpoint'></div>";
}

/**
 * redirect the mousedown and over event
 * @param  event 
 */
function toggleRedirect(event){
    if(mouseDown){
        setNode(event)
    }
}



/**
 * set the node to the state we want
 */
function setNode(event){
    let currentNode=event.currentTarget;
    
    let indexX=parseInt(currentNode.dataset.row)
    let indexY=parseInt(currentNode.dataset.column)
    
    if(setterMode=="Wall"){
        setWall(indexX,indexY)
    }
    else if(setterMode=="StartPoint"){
        setStart(indexX,indexY)
    }
    else if(setterMode=="EndPoint"){
        setEnd(indexX,indexY)
    }
        
}

class PriorityQueue {
    constructor() {
      this.collection = [];
    }
    enqueue(element){
      if (this.isEmpty()){ 
        this.collection.push(element);
      } else {
        let added = false;
        for (let i = 1; i <= this.collection.length; i++){
          if (element[1] < this.collection[i-1][1]){ 
            this.collection.splice(i-1, 0, element);
            added = true;
            break;
          }
        }
        if (!added){
            this.collection.push(element);
        }
      }
    };
    dequeue() {
      let value = this.collection.shift();
      return value;
    };
    isEmpty() {
      return (this.collection.length == 0) 
    };
}


function Dijkstra(event){
    clearGridSaveWall()
    resetVisit()
    //setting the startpoint to 0 to initiate the BFS
    Grid[StartPoint[0]][StartPoint[1]].VisitedAt = 0;
    var modifiedThisRound = true
    //the variable that indicates the current round for finding
    var found = false
    var queue = new PriorityQueue()
    var visitedSet = new Set()
    // visitedSet.add(Grid[StartPoint[0]][StartPoint[1]].id)
    
    queue.enqueue([[StartPoint[0],StartPoint[1]],0])
    
        
    // find all the neighbour point inside the list      
    while(!queue.isEmpty()){
        thisPoint = queue.dequeue()
        // console.log(thisPoint[0]+"-"+thisPoint[1])
        var thisRow = thisPoint[0][0]
        var thisCol = thisPoint[0][1]
        var thisCost = thisPoint[1]

        console.log("At"+thisRow+"-"+thisCol+"with "+thisCost)
        console.log(!visitedSet.has([0,0]))

        if(!visitedSet.has(Grid[thisRow][thisCol].id)){
            Grid[thisRow][thisCol].VisitedAt = thisCost  
            if (!(thisRow==StartPoint[0] && thisCol==StartPoint[1]) && !(thisRow==EndPoint[0] && thisCol==EndPoint[1])){
                document.getElementById(Grid[thisRow][thisCol].id).innerHTML = "<div id='explored"+thisRow+"x"+thisCol+"' class='explored'></div>"
                document.getElementById("explored"+thisRow+"x"+thisCol).style.animationDelay=thisCost/5+"s"
            }
                
             //upper neighbour
            if(thisRow > 0){
                if(!visitedSet.has([thisRow-1,thisCol]) && Grid[thisRow-1][thisCol].State != "Wall" ){
                    queue.enqueue([[thisRow-1,thisCol],thisCost+1])
    
                }
            }
            //lower neighbour
            if(thisRow < GRID_ROW_SIZE - 1){
                if(!visitedSet.has([thisRow+1,thisCol]) && Grid[thisRow+1][thisCol].State != "Wall"){
                    queue.enqueue([[thisRow+1,thisCol],thisCost+1])
                                                
                }
            }
            //left neighbour
            if(thisCol > 0){
                if(!visitedSet.has([thisRow,thisCol-1]) &&Grid[thisRow][thisCol-1].State!= "Wall"){
                    queue.enqueue([[thisRow,thisCol-1],thisCost+1])
                    
                                                    
                }
            }
            //right neighbour
            if(thisCol < GRID_COL_SIZE -1){
                if(!visitedSet.has([thisRow,thisCol+1]) && Grid[thisRow][thisCol+1].State != "Wall"){
                    queue.enqueue([[thisRow,thisCol+1],thisCost+1])
                    
                                                
                }
            }
            visitedSet.add(Grid[thisRow][thisCol].id)  
        }
        

       
    }
    // queue = newQueue
    if(visitedSet.has(Grid[EndPoint[0]][EndPoint[1]].id)){
        found = true
    }

    
    consoleVisitPrinter()
    if(!found){
        console.log("End of search, not found")
        alert("No possible route found")
        return
    }
    console.log("Found at round: " + Grid[EndPoint[0]][EndPoint[1]].VisitedAt)


    var counter = 0
    var myInterval = setInterval(() => {
        if(counter < 1000*Grid[EndPoint[0]][EndPoint[1]].VisitedAt/5){
            counter+= 100
        }
        else{
            pathGatherer()
            clearInterval(myInterval)
        }
    }, 100);

}

