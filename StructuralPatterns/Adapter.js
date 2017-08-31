//Converts one interface to another
//in other words helps to fit "a round peg in a square hole."

//Used to avoid extensive refactoring when a dependency interface changes

//old interface
function OldVideoEditor() {
  this.cut = function (timeStart, timeEnd, format) {
    //video processing logic
  }
}

//new interface
function NewVideoEditor() {
  this.setFormat = function (format) {
    this.format = format;
  };
  this.setStart = function (timeStart) {
    this.start = timeStart;
  };
  this.setEnd = function (timeEnd) {
    this.end = timeEnd;
  };
  this.cut = function () {
    console.log(`The video cut from ${this.start}s to ${this.end}s has been saved in ${this.format} format`);
  }
}

//adapter
function EditVideoAdapter() {
  const edit = new NewVideoEditor();

  return {
    cut: function (timeStart, timeEnd, format) {
      edit.setFormat(format);
      edit.setStart(timeStart);
      edit.setEnd(timeEnd);
      edit.cut();
    }
  }
}

const editor = new EditVideoAdapter();
editor.cut(4, 15, "mp4");