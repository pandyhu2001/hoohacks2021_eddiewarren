
// text = "An unrelentingly tedious book that can be summed up as follows. We are irrationally prone to jump to conclusions based on rule-of-thumb shortcuts to actual reasoning, and in reliance on bad evidence, even though we have the capacity to think our way to better conclusions. But we're lazy, so we don't. We don't understand statistics, and if we did, we'd be more cautious in our judgments, and less prone to think highly of our own skill at judging probabilities and outcomes. Life not only is uncertain, we cannot understand it systemically, and luck has just as much to do with what happens to us -- maybe even more -- than we care to admit. When in doubt, rely on an algorithm, because it's more accurate than your best guess or some expert's opinion. Above all, determine the baseline before you come to any decisions."
// var xhr = new XMLHttpRequest();
// xhr.open("POST", "https://api.deepai.org/api/summarization");
// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// xhr.setRequestHeader('api-key', '1647852d-c119-421d-a5d7-e5f367936d4e');
// xhr.onreadystatechange = function() {//Call a function when the state changes.
//     if(xhr.readyState == 4 && xhr.status == 200) {
//         console.log(JSON.parse(xhr.responseText)["output"])
//     }
// }
// xhr.send("text=" + encodeURIComponent(text));

function summarize(text) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.deepai.org/api/summarization");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader('api-key', '1647852d-c119-421d-a5d7-e5f367936d4e');
    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            let summary = JSON.parse(xhr.responseText)["output"];
            if (summary.length == 0) {
                let description = document.getElementById("description");
                if (description.children.length > 1) {
                    description.children[1].innerText += "\n\nReview Summary:\n\n" + text;
                }
                else {
                    description.innerText += "\n\nReview Summary:\n\n" + text;
                }
            }
            else if (summary.length < 500) {
                let description = document.getElementById("description");
                if (description.children.length > 1) {
                    description.children[1].innerText += "\n\nReview Summary:\n\n" + summary;
                }
                else {
                    description.innerText += "\n\nReview Summary:\n\n" + summary;
                }
            }
            else {
                summarize(summary);
            }
            
        }
    }
    xhr.send("text=" + encodeURIComponent(text));
}


window.addEventListener ("load", myMain, false);


function myMain (evt) {
    var jsInitChecktimer = setInterval (checkForJS_Finish, 111);

    
    function checkForJS_Finish () {
        if (    document.getElementsByClassName("reviewText stacked").length > 0 && document.getElementById("description") !== null
        ) {
            clearInterval (jsInitChecktimer);
            var x = document.getElementsByClassName("reviewText stacked");
            console.log("---------------------\n");
            let comments = Array();
            for (var i=0, len=x.length; i<len; i=i+1) {
                let reviewText = x[i];
                console.log(reviewText);
                // console.log(reviewText);
                let container = reviewText.children[0];
                let children = container.children;
                let comment = "";
                if (children.length == 1) {
                    comment = children[0].innerText;
                }
                else {
                    comment = children[1].innerText;
                }
                if (comment !== "click here.") {
                    comments.push(comment);
                }
            }
            // for (var i = 0; i < comments.length; i++) {
            //     console.log(comments[i]);
            // }
            console.log("---------------------\n");
            text = comments.join(". \n\n")
            // console.log(text);
            summarize(text);

        }
    }
}

