#!/usr/bin/env node

const fs = require("fs");
const { stringify } = require("querystring");
//require is import word
let arguments = process.argv.slice(2);

let flags=[];
let filenames=[];
let secondaryArguments = [];

for(let i of arguments)
{
    if(i[0]=="-")
    {
     flags.push(i);
    } 
    
    else if(i[0]=="%")
    {
        secondaryArguments.push(i.slice(1));
    }
    else
    { 
        filenames.push(i);
    }
}

// if(flags.length==0 && filenames.length!=0)
// {
//     for(let file of filenames)
//     {
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// }
// else
// {
// //rs=> remove spaces from all files which is given in command line 
//  for(let flag of flags)
//  {
//      if(flag=="-rs")
//      {
//          for(let file of filenames)
//          {
// let fileData = fs.readFileSync(file,"utf-8");
// let fileDataArray = fileData.split(" ");
// let fileString = fileDataArray.join("");
// console.log(fileString);
//          }
//      }
//  } 
// }

for(let file of filenames)
{
    let filedata=fs.readFileSync(file,"utf-8");
    for(let flag of flags)
    {
        if(flag=="-rs")
        {
            filedata=filedata.split(" ").join("");
        }
        if(flag=="-rn")
        {
            filedata=filedata.split("\r\n").join("");
        }
        if(flag=="-rsc")
        {
        //     let tempString="";
        //     for(let character of filedata)
        //     {
        //     if(character.charCodeAt(0)>=66 && character.charCodeAt(0)<=90 || character.charCodeAt(0)>=97 && character.charCodeAt(0)<122 )
        //     {
        //         tempString+=character;
        //     }
        // }
        //  filedata=tempString;
        for(let secondaryArgument of secondaryArguments )
        {
            filedata=removeAll(filedata,secondaryArgument)
        }
    }
    if(flag=="-relef")
    {
        let ans =removeExtraLineExcpetFirst(filedata);
      for(let i=0;i<ans.length;i++)
    {
      console.log(ans[i]);
    }
    }
    if(flag=="-s"){
       let data= addsequence(filedata);
       console.log(data);
    }
    if(flag=="-sn"){
      let data=  addsequencenTnel(filedata);
      console.log(data);
    }
    if(flag=="-rel")
    {
      let ans =removeExtraLine(filedata);
      for(let i=0;i<ans.length;i++)
    {
      console.log(ans[i]);
    }
}
}
    console.log(filedata);
}

function removeAll(string,removedata)
{
    return string.split(removedata).join("");
}

// sequential number 

// function addsequence(content){
//     let contentArr =content.split("\r\n");
//     for(let i=0;i<contentArr.length;i++)
//     {
//         contentArr[i]=(i+1)+" "+contentArr[i];
//     }
//     return contentArr;
// }

// add sequential number to only non empty lines

function addsequencenTnel(content){
    let contentArr =content.split("\r\n");
    let count =1;
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!="")
        {
            contentArr[i]=count+" "+contentArr[i];
            count++;
        }
    }
    return contentArr;
}


function removeExtraLine(content)
{
let contentArr=content.split("\r\n");
let data=[];
for(let i=0;i<contentArr.length;i++)
{
    if(contentArr[i]!="")
    {
        data.push(contentArr[i]);
    }
}
return data;

}

function removeExtraLineExcpetFirst(content)
{
    let contentArr=content.split("\r\n");
    let data=[];
    for(let i=1;i<contentArr.length;i++)
    {
        if(contentArr[i]=="" && contentArr[i-1]=="")
        {
            contentArr[i]=null;
        }
        if(contentArr[i]=="" && contentArr[i-1]==null)
        {
            contentArr[i]=null;
        }
    }
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!=null)
        {
            data.push(contentArr[i]);
        }
    }
    return data;
}


