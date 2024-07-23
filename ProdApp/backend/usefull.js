
const key="AIzaSyCk2XEUL7bA4BaUMdpapdnjTznF7QZXuaQ"
const axios=require('axios')
async function getDuration(id){
    let data=await axios.get('https://www.googleapis.com/youtube/v3/videos',
        {
            params:{key:key,part:'contentDetails',id:id}
        }
    )
    return (data.data.items[0].contentDetails.duration)
   // console.log(data.data.items[0].contentDetails.duration)
}
function errorCheck(a){
    if(!a) return false
    for(let k of a){
        if(!k)return false;
        if(k.length==0)return false;
    }return true;
}
function cleanDuration(dur){
    dur=dur.slice(2)
    let count=0
    console.log(dur)
    if(dur.search('H')!=-1){
     count+=3600*parseInt(dur.slice(0,dur.search('H')))
     dur=dur.substr(dur.search('H')+1)
    }
    if(dur.search('M')!=-1){
     count+=60*parseInt(dur.slice(0,dur.search('M')))
     dur=dur.substr(dur.search('M')+1)
    }
    if(dur.search('S')!=-1){
     count+=parseInt(dur.slice(0,dur.search('S')))
     dur=dur.substr(dur.search('S')+1)
    }
    
    return count
}
function parseLink(link){
    let index=link.search('=')+1;
    let linker=link.slice(index,index+11);
    return linker;
  }
  module.exports={parseLink:parseLink,cleanDuration:cleanDuration,errorCheck:errorCheck,getDuration:getDuration}