const data=[
{
  name:'Francis',
  age:'30'
},
{
name:'Jessica',
age:'43'
},
{
  name:'Johnathan',
  age:'21'
},
{
name:'Wayne',
age:'21'
}
];
const info=document.querySelector("#info")
let details=data.map(function(item){
  return'<div>'+item.name+''+'is'+item.age+'years old'+'</div>';
});
info.innerHTML=details.join('\n');
