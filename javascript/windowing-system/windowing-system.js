// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined so they are available for the tests.
 */

export function Size(width = 80,height = 60){
    this.width = width;
    this.height = height;
    this.resize = function(newWidth, newHeight){
        this.width = newWidth;
        this.height = newHeight;
    }
}

export function Position(x=0 ,y=0){
    this.x = x;
    this.y = y;
    this.move = function(newX, newY){
        this.x = newX;
        this.y = newY;
    }
}

export class ProgramWindow{
    constructor(){
        this.screenSize = new Size(800,600);
        this.size = new Size();
        this.position = new Position();
    }

    resize(Size){
        const maxWidth = this.screenSize.width - this.position.x;
        const maxHeight = this.screenSize.height - this.position.y;

        this.size.resize(
            (Size.width > 0) && (Size.width <= maxWidth) ? 
                Size.width : (Size.width > maxWidth) ? 
                    maxWidth : 1,
            (Size.height > 0) && (Size.height <= maxHeight) ?
                 Size.height : (Size.height > maxHeight) ? 
                 maxHeight : 1
        );
    }

    move(Position){
        this.position.move(
            (Position.x > (this.screenSize.width - this.size.width)) ?
                (this.screenSize.width - this.size.width) : 
                    Position.x < 0 ? 0 : Position.x,
            (Position.y > (this.screenSize.height - this.size.height)) ?
                (this.screenSize.height - this.size.height) : 
                    Position.y < 0 ? 0 : Position.y,
        );
    }
}

export function changeWindow(ProgramWindow){
    ProgramWindow.resize(new Size(400,300));
    ProgramWindow.move(new Position(100,150));
    return ProgramWindow;
}