var jass={read:function(file,url){if(url==true){$.get(file,function(data){jass.parser(data);$('#output').html(data);})}else{jass.parser(file);$('#output').html(file);}},parser:function(data){var rules=data.match(/[^}]*[^{}]*{/g);$('#stats').append("<span class='pill'>Rules: <strong>"+rules.length+"</strong></span>");var count=rules.length;if(rules){rules=jass.strip_and_show_dups(rules);}
$('#stats').append("<span class='pill'>Duplicates: <strong>"+(rules.length-1)+"</strong></span>");jass.show_duplicates(rules);$('#loader').fadeOut();},show_duplicates:function(data){delete data[0];html=new Array();for(i=0;i<data.length;i++){if(data[i]){html[i]="<span class='dup'>"+data[i]+"</span>";}}
html=html.toString()
html=html.replace(/,/g,'');html=html.replace(/{/g,'');$('#duplicates').html(html);},strip_and_show_dups:function(a){temp=new Array();for(i=0;i<a.length;i++){if(!jass.contains(temp,a[i])){temp.length+=1;temp[temp.length]=a[i];}}
return jass.diff(temp,a);},contains:function(a,e){for(j=0;j<a.length;j++)if(a[j]==e)return true;return false;},diff:function(a1,a2){var a=[],diff=[];for(var i=0;i<a1.length;i++)
a[a1[i]]=true;for(var i=0;i<a2.length;i++)
if(a[a2[i]])delete a[a2[i]];else a[a2[i]]=true;for(var k in a)
diff.push(k);return diff;}}
