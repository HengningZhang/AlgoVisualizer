/**
 * GLOBAL DATA SETTINGS
 */
const GRID_ROW_SIZE = 9
const GRID_COL_SIZE = 9 

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
    }
}
Grid[0][0].State = "Start"
Grid[8][8].State = "End"
// for (let i = 0; i < GRID_ROW_SIZE; i++) {    
    // for (let j = 0; j < GRID_COL_SIZE; j++) {
//         console.log(Grid[i][j].row + "-" + Grid[i][j].col + " ")
//     }
// }
var StartPoint = [0,0]
var EndPoint = [GRID_ROW_SIZE -1, GRID_COL_SIZE -1]
var setterMode="Wall"

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
            var nodeName="node"+i+"x"+j
            document.getElementById(nodeName).innerHTML="";
    
        }
    }
    Grid[0][0].State = "Start"
    Grid[GRID_ROW_SIZE-1][GRID_COL_SIZE-1].State = "End"
    document.getElementById("node"+0+"x"+0).innerHTML="<div class='startpoint'></div>";
    document.getElementById("node"+(GRID_ROW_SIZE-1)+"x"+(GRID_ROW_SIZE-1)).innerHTML="<div class='endpoint'></div>";

}

/**
 * clears the gird but saves the wall
 */
function clearGridSaveWall(){
    for (let i = 0; i < GRID_ROW_SIZE; i++) {    
        for (let j = 0; j < GRID_COL_SIZE; j++) {
            let State = Grid[i][j].State;
            if(status == "Wall" || status == "Start" || status == "End"){
                continue;
            }
            Grid[i][j].State = "NULL"
            Grid[i][j].VisitedAt = -1
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
    Grid[rownum][colnum].State = "Start"
    StartPoint = [rownum,colnum]
    var nodeName="node"+rownum+"x"+colnum
    document.getElementById(nodeName).innerHTML="<div class='"+setterMode+"'></div>";
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
    Grid[rownum][colnum].State = "End"
    EndPoint = [rownum,colnum]
    var nodeName="node"+rownum+"x"+colnum
    document.getElementById(nodeName).innerHTML="<div class='"+setterMode+"'></div>";
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
    var nodeName="node"+rownum+"x"+colnum
    document.getElementById(nodeName).innerHTML="<div class='"+setterMode+"'></div>";
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
                        // document.getElementById("node"+i+"x"+j).innerHTML="<div id='explored"+i+"x"+j+"' class='explored'></div>";
                        // document.getElementById("explored"+i+"x"+j).style.animationDelay=roundIndicator/5+"s"
                        if(i == EndPoint[0] && j == EndPoint[1]){
                            found = true
                            break;
                        }
                    }
                }
                if(i<GRID_ROW_SIZE-1){
                    if(Grid[i+1][j].VisitedAt == roundIndicator-1){
                        modifiedThisRound = true
                        Grid[i][j].VisitedAt = roundIndicator
                        // document.getElementById("node"+i+"x"+j).innerHTML="<div id='explored"+i+"x"+j+"' class='explored'></div>";
                        // document.getElementById("explored"+i+"x"+j).style.animationDelay=roundIndicator/5+"s"
                        if(i == EndPoint[0] && j == EndPoint[1]){
                            found = true
                            break;
                        }
                    }
                }
                if(j>0){
                    if(Grid[i][j-1].VisitedAt == roundIndicator-1){
                        modifiedThisRound = true
                        Grid[i][j].VisitedAt = roundIndicator
                        // document.getElementById("node"+i+"x"+j).innerHTML="<div id='explored"+i+"x"+j+"' class='explored'></div>";
                        // document.getElementById("explored"+i+"x"+j).style.animationDelay=roundIndicator/5+"s"
                        if(i == EndPoint[0] && j == EndPoint[1]){
                            found = true
                            break;
                        }
                    }
                }
                if(j<GRID_COL_SIZE-1){
                    if(Grid[i][j+1].VisitedAt == roundIndicator-1){
                        modifiedThisRound = true
                        Grid[i][j].VisitedAt = roundIndicator
                        // document.getElementById("node"+i+"x"+j).innerHTML="<div id='explored"+i+"x"+j+"' class='explored'></div>";
                        // document.getElementById("explored"+i+"x"+j).style.animationDelay=roundIndicator/5+"s"
                        if(i == EndPoint[0] && j == EndPoint[1]){
                            found = true
                            break;
                        }
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
    pathGatherer()

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
            document.getElementById("node"+currentPoint[0]+"x"+currentPoint[1]).innerHTML="<div id='path"+currentPoint[0]+"x"+currentPoint[1]+"' class='path'></div>";
            document.getElementById("path"+currentPoint[0]+"x"+currentPoint[1]).style.animationDelay=Grid[currentPoint[0]][currentPoint[1]].VisitedAt/15+"s"
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
}

/**
 * initialize the graph in html and add listeners to each of the nodes
 */
function initializeGraph(){
    console.log("initializing graph")
    var tempHTML=""
    for (let i = 0; i < GRID_ROW_SIZE; i++) {    
        for (let j = 0; j < GRID_COL_SIZE; j++) {
            tempHTML+="<node id='node"+i+"x"+j+"' data-row='"+i+"' data-column='"+j+"'></node>"
        }
        tempHTML+="<br></br>"
    }
    
    document.getElementById("graphWrapper").innerHTML=tempHTML;
    for (let i = 0; i < GRID_ROW_SIZE; i++) {    
        for (let j = 0; j < GRID_COL_SIZE; j++) {
            document.getElementById("node"+i+"x"+j).addEventListener("click", setNode)
        }
    }
    document.getElementById("node"+StartPoint[0]+"x"+StartPoint[1]).innerHTML="<div class='startpoint'></div>";
    document.getElementById("node"+EndPoint[0]+"x"+EndPoint[1]).innerHTML="<div class='endpoint'></div>";
}

/**
 * set the node to the state we want
 */
function setNode(event){
    let currentNode=event.currentTarget;
    
    let indexX=parseInt(currentNode.dataset.row)
    let indexY=parseInt(currentNode.dataset.column)
    if(Grid[indexX][indexY].State==setterMode){
        return
    }
    else{
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
        
}

// setWall()
// BFS()