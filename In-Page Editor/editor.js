$(function()
{
    // a variable that states whether or not the page is being edited
    var editing = false;

    function toggleEdit()
    {
        // if editing is false then set it to true and change the html on the page
        // to edit mode.
        if (editing)
        {
            editing = false;
            setViewMode();
        }
        else
        {
            editing = true;
            setEditMode();
        }
    }

    function setViewMode()
    {
        // change the edit button's text to be 'edit'
        $("#edit").text("Edit");

        // Grab the current contents of the page
        var title = $("#title").val();
        var content = $("#content").val();

        // Replace the title text box with a header
        var titleHtml = '<h1 id="title" class="header">' + title + '</h1>';
        $("#titleContainer").html(titleHtml);

        // replace the content textArea with the appropriate tag
        var contentHtml = "";
        // split the string into several paragraphs
        var paragraphs = content.split("\n");
        // Loop through the paragraphs and add their html
        for (var i = 0; i < paragraphs.length; i++)
        {
            contentHtml += '<p class="content">' + paragraphs[i] + '</p>';
        }
        $("#contentContainer").html(contentHtml);
    }

    function setEditMode()
    {
        // change the edit button's text to be 'save'
        $("#edit").text("Save");

        // Grab the current contents of the page
        var title = $("#title").text();
        var content = $("#contentContainer").children();

        // Replace the title with a text box
        var titleHtml = '<div class="ui input"> <input id="title" type="text" /></div>';
        $("#titleContainer").html(titleHtml);
        // Setting the value of the textbox here.
        // Had issues with quotes when doing it in the line above.
        $("#title").val(escapeHTML(title));

        // Replace the content with a text area
        var contentHtml = '<div class="ui form"> <div class="field"> <textarea id="content">';
        // loop through each paragraph and grab the text from them.
        for (var i = 0; i < content.length; i++)
        {
            contentHtml += escapeHTML(content[i].innerText) + "\n";
        }

        contentHtml += '</textarea> </div> </div>';
        $("#contentContainer").html(contentHtml);
    }

    // A function to rip html characters from strings to help prevent cross site scripting
    // Retrieved from: https://coderwall.com/p/ostduq/escape-html-with-javascript
    function escapeHTML(contentString) {
        return contentString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Event handler
    $("#edit").click(toggleEdit);
});