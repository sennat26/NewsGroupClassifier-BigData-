//db.system.js.save({_id: "myfunc", value: function(){return "hello";}}) 
load("stemmer.js");
var mapfunction = function(){
	var lines = this.contents.split("\n");
	if (lines){
		for(var i=0;i<lines.length;i++){
			var line = lines[i].toLowerCase();
			var trimLine = line.trim();
			var checkStartWord = checkStartEnd(trimLine);
			if (!checkStartWord) {
				trimLine = trimLine.replace(/\t+/g, " ");
				trimLine = trimLine.replace(/[/',.$#|&_%!~*?`;:^(\[\])"\\={}<>+-]/g, " ");
				var words = trimLine.split(" ");
				for(var j=0;j<words.length;j++){
					words[j] = words[j].trim();
					if(!checkForEmail(words[j])) {
						var woNum = words[j].replace(/\d+/g,"");
						woNum = woNum.replace(/@+/g,"");
						var stemmedWord = stem(woNum);
						if(stemmedWord!= '' && stemmedWord.length >1 ) {
						//if(!checkForStopWords(woNum)) {
							//var comp = stemmedWord + "-"+this.category_name;
							emit({word:stemmedWord,category:this.category_name},1); 
							//emit({word:'',category:this.category_name},1);
							//emit({word:stemmedWord,category:''},1);
						//}
						}
					}
					
				}
			}
		}
	}
}


//db.system.js.save({_id: "checkForStopWords", value: function(trimLine) {
	//return trimLine.replace(/[^\w\s]/gi, '')
//}})

db.system.js.save({_id: "checkForEmail", value: function(trimLine) {
 	var re = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)(\\.[A-Za-z]{2,})$");
	return re.test(trimLine);
}})

db.system.js.save({_id: "removeNumbers", value: function(word) {
	if(word.length>0)
		word = word.replace(/\d+/g,"");
	return word;
}})

db.system.js.save({_id: "checkStartEnd", value: function(trimLine) {
	var checkStartWord = trimLine.indexOf('from') == 0 || trimLine.indexOf('to') == 0|| trimLine.indexOf('summary') == 0
				|| trimLine.indexOf('expires') == 0|| trimLine.indexOf('distribution') == 0
				|| trimLine.indexOf('organization') == 0|| trimLine.indexOf('supersedes') == 0|| trimLine.indexOf('lines') == 0
				|| trimLine.indexOf('archive-name') == 0|| trimLine.indexOf('last-modified') == 0|| trimLine.indexOf('version') == 0
				|| trimLine.indexOf('reply-to') == 0|| trimLine.indexOf('article-i.d.') == 0|| trimLine.indexOf('followup-to') == 0
				|| trimLine.indexOf('originator') == 0|| trimLine.indexOf('last-update') == 0
				|| trimLine.match('writes'+"$") == 'writes';
				
	return checkStartWord;
}})




db.system.js.save({_id: "checkStopWord", value: function(word) {
	//var result = files1.find({words:word})
	if(strStartsWith(word,'F'))
		return true;
	else 
		return false;
}})

db.system.js.save({_id: "strStartsWith",value:function (str, prefix) {
    return str.indexOf(prefix) == 0;
}})

function strEndsWith(str, suffix) {
    return str.match(suffix+"$")==suffix;
}


var reduceFunction = function(k,v) {
	var count = 0;
	for (ve in v) {
		count++;
	}
	return count;
}

db.files.mapReduce(mapfunction, reduceFunction, {out:"word_category"})



var map2 = function() {
	emit(this._id.category, {count:this.value});
}


var reduce2 = function(k,v)  {
	var results = {count:0};
	v.forEach(function(value){
		results.count += value.count;
	});
	return results;
}


db.word_category.mapReduce(map2, reduce2, {out:"category_count"})





var map3 = function() {
	emit(this._id.word, {count:1});
}


var reduce3 = function(k,v)  {
	return {count:1};
}


db.word_category.mapReduce(map3, reduce3, {out:"unique_words"})



//var map4 = function() {
	//emit(this.category, {text_value: "",text_count1:0,text_count2:this.value.count});
	//emit(this.category, [{text_value:"", text_count1:0,text_count2:this.value.count}]);
//}
$total = {count:db.unique_words.count()};
$cat1 ={name:"alt.atheism",count:36026};
$cat2 ={name:"comp.graphics",count:22968};
$cat3 ={name:"comp.os.ms-windows.misc",count:50495};
$cat4 ={name:"comp.sys.ibm.pc.hardware",count:20254};
$cat5 ={name:"comp.sys.mac.hardware",count:16768};
$cat6 ={name:"comp.windows.x",count:24312};
$cat7 ={name:"misc.forsale",count:18423};
$cat8 ={name:"rec.autos",count:27969};
$cat9 ={name:"rec.motorcycles",count:26560};
$cat10 ={name:"rec.sport.baseball",count:24021};
$cat11 ={name:"arec.sport.hockey",count:29944};
$cat12 ={name:"sci.crypt",count:35737};
$cat13 ={name:"sci.electronics",count:23398};
$cat14 ={name:"sci.med",count:35932};
$cat15 ={name:"sci.space",count:34889};
$cat16 ={name:"soc.religion.christian",count:36268};
$cat17 ={name:"talk.politics.guns",count:27533};
$cat18 ={name:"talk.politics.mideast",count:53716};
$cat19 ={name:"talk.politics.misc",count:27196};
$cat20 ={name:"talk.religion.misc",count:21492};

var map5 = function() {
	var prob = {textValue:this._id.word, textCat:this._id.category};
	var count = {totalCount:this.value};
	var catCount = {categoryCount:0};
	
	if(this._id.category==cat1.name) {
		catCount.categoryCount = cat1.count;
	} else if(this._id.category == cat2.name) {
		catCount.categoryCount = cat2.count;
	}  else if(this._id.category ==cat3.name) {
		catCount.categoryCount = cat3.count;
	}  else if(this._id.category==cat4.name) {
		catCount.categoryCount = cat4.count;
	}  else if(this._id.category==cat5.name) {
		catCount.categoryCount = cat5.count;
	}  else if(this._id.category==cat6.name) {
		catCount.categoryCount = cat6.count;
	}  else if(this._id.category==cat7.name) {
		catCount.categoryCount = cat7.count;
	}  else if(this._id.category==cat8.name) {
		catCount.categoryCount = cat8.count;
	}  else if(this._id.category==cat9.name) {
		catCount.categoryCount = cat9.count;
	}  else if(this._id.category==cat10.name) {
		catCount.categoryCount = cat10.count;
	}  else if(this._id.category==cat11.name) {
		catCount.categoryCount = cat11.count;
	}  else if(this._id.category==cat12.name) {
		catCount.categoryCount = cat12.count;
	}  else if(this._id.category==cat13.name) {
		catCount.categoryCount = cat13.count;
	}  else if(this._id.category==cat14.name) {
		catCount.categoryCount = cat14.count;
	}  else if(this._id.category==cat15.name) {
		catCount.categoryCount = cat15.count;
	}  else if(this._id.category==cat16.name) {
		catCount.categoryCount = cat16.count;
	}  else if(this._id.category==cat17.name) {
		catCount.categoryCount = cat17.count;
	}  else if(this._id.category==cat18.name) {
		catCount.categoryCount = cat18.count;
	}   else if(this._id.category==cat19.name) {
		catCount.categoryCount = cat19.count;
	} else {
		catCount.categoryCount = cat20.count;
	}
	
	var probValue = {value:0};
	probValue.value = (count.totalCount + 1)/(catCount.categoryCount + total.count);
	emit({word:this._id.word,category: this._id.category}, {prob:probValue.value});
}

var reduce5 = function(k,values){
	values.forEach(function(value) {
		return {prob:value};
	});
}

db.word_category.mapReduce(map5, reduce5, {out:"probJoin",scope:{cat1:$cat1,cat2:$cat2,cat3:$cat3,cat4:$cat4,cat5:$cat5,cat6:$cat6,cat7:$cat7,cat8:$cat8,
cat9:$cat9,cat10:$cat10,cat11:$cat11,cat12:$cat12,cat13:$cat13,cat14:$cat14,cat15:$cat15,cat16:$cat16,cat17:$cat17,cat18:$cat18,cat19:$cat19,
cat20:$cat20,total:$total}})
db.probJoin.find();
 
 $category_count = new Array();
 var i =0;
 var c = db.category_count.find();
 while(c.hasNext()) { var cur = c.next(); $category_count[i] = {name:cur._id,count:cur.value.count}; i++;};
 
var map5 = function(){
	var prob = {textValue:this._id.word, textCat:this._id.category};
	var count = {totalCount:this.value};
	var catCount = {categoryCount:0};
	for(var i=0;i<20;i++)
	{
		if(this._id.category == "kk")
		{
			catCount.categoryCount = 2;
			break;
		}
	}
	var probValue = {value:0};
	probValue.value = (count.totalCount + 1)/(catCount.categoryCount + total.count);
	emit(word:this._id.word, category:this._id.category,{prob:probValue.value});
}


var reduce5 = function(k,values){
	values.forEach(function(value) {
		return {prob:value};
	});
}

var maptest = function(){
	var lines = this.contents.split("\n");
	if (lines){
		for(var i=0;i<lines.length;i++){
			var line = lines[i].toLowerCase();
			var trimLine = line.trim();
			var checkStartWord = checkStartEnd(trimLine);
			if (!checkStartWord) {
				trimLine = trimLine.replace(/\t+/g, " ");
				//trimLine = trimLine.replace(/\"/g, " ");
				trimLine = trimLine.replace(/[\.`~,$#|&_%!~*?;:/^\()={}<>+-]/g, " ");
				//trimLine = trimLine.replace("/"," ");
				//trimLine = trimLine.replace("<"," ");
				//trimLine = trimLine.replace(">"," ");
				//trimLine = trimLine.replace("\"," ");
				//trimLine = trimLine.replace("."," ");
				var words = trimLine.split(" ");
				for(var j=0;j<words.length;j++){
					words[j] = words[j].trim();
					if(!checkForEmail(words[j])) {
						var woNum = words[j].replace(/\d+/g,"");
						woNum = woNum.replace(/@+/g,"");
						var stemmedWord = stem(woNum);
						if(stemmedWord!= '' && stemmedWord.length >1 ) {
							emit({word:stemmedWord},{GCategory:this.category_name}); 
						}
					}
				}
			}
		}
	}
}

var reducetest = function(k,values){
	var cat;
	values.forEach(function(value) {
		cat = value.GCategory;
	});
	
	return {GCategory:cat};
}
db.test.mapReduce(maptest, reducetest, {out:"testJoin",scope:{category_count:$category_count,total:$total}});


$category_count = new Array();
 var i =0;
 var c = db.category_count.find();
 while(c.hasNext()) { var cur = c.next(); $category_count[i] = {id:cur._id,count:cur.value.count}; i++; $count++};
 
 
var map6 = function() {
	for(var i =0 ;i < category_count.length;i++){
		emit({word:this._id.word, Tcategory: category_count[i].id},{GCategory:(this.value == null)?"":this.value.GCategory,basevalue:(1/(category_count[i].count+total.count))});
	}
}


var reduce6 = function(k,v)  {
	var cat;
	values.forEach(function(value) {
		cat = value.GCategory;
	});
	
	return {GCategory:cat};
}

db.testJoin.mapReduce(map6, reduce6, {out:"testcombinations",scope:{category_count:$category_count,total:$total}});




var map7 = function() {
	emit({word:this._id.word, category: this._id.Tcategory},{GCategory:this.value.GCategory,basevalue:this.value.basevalue,prob:0,id:1});
}

var map8 = function() {
	emit({word:this._id.word, category: this._id.category},{GCategory:null,basevalue:0,prob:this.value.prob,id:2});
}

var reduce7 = function(k,v)  {
	var result  = {GCategory:null,basevalue:0,prob:0};
	var result1  = {GCategory:null,basevalue:0,prob:0};
	var i;
	v.forEach(function(value) {
		if(value.basevalue==0){
			result.prob = value.prob;
			i = i+ value.id;
		}else{
			result.basevalue = value.basevalue;
			result.GCategory = value.GCategory;
			i = i+ value.id;
		}
		
	});
	if (i == 3) { 
		return result;
	} else {
		return result1;
	}
}

db.testcombinations.mapReduce(map7, reduce7, {out:{reduce:"condprob"}});
db.probJoin.mapReduce(map8, reduce7, {out:{reduce:"condprob"}});

var map9 = function() {
		if (this.value.GCategory != null) {
			emit({word:this._id.word, category: this._id.category},{GCategory:this.value.GCategory,basevalue:this.value.basevalue,prob:this.value.prob});
		}
}

var reduce8 = function(k,v)  {
	var result  = {GCategory:null,basevalue:0,prob:0};
	
	result.GCategory = v.GCategory;
		result.basevalue = v.basevalue;
		result.prob = v.prob;
	return result;
	
}

db.condprob.mapReduce(map9, reduce8, {out:"finalvalue"});

