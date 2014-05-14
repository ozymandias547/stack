CSS guidelines:

1.  Most large templates will have a corresponding CSS file. 
2.  Each CSS file will be sectioned using the following syntax:

	//-----------------------------------
	// Description of section
	//-----------------------------------

3.  A 'section' is a container within the stack, for example a stacks 'header' container and 'body' container.
4.  Use indentations to show inheritance


//-----------------------------------
// Stack Header container
//-----------------------------------

.StackHeader {
    background-color: @c4;
    .fontLargeBlack;
    position: relative;
}
    
    .StackHeader .stackButtonDock {
        position:absolute;
        right:0;
        top:0;
        text-align:right;
        display: inline-block;
    }

    .StackHeader .stackCollaboratorContainer {
        margin-top: 3px;
        width: 29px;
        height: 29px;
        float: left;
        display: inline-block;
        position: relative;
    }

5.  Use as few selectors as possible, but maintain organization through using inheritance selctors

	BAD: 
	.StackHeader .stackCollaboratorContainer .collaboratorTop img a
	
	GOOD: 
	.StackHeader .imageLink

6. If a selector seems like it can be used as a global selector throughout the site, consider moving it to _main.less;

7. Remember to keep an eye on the LESS import variables.  The more we use them, the easier it is to customize styles.