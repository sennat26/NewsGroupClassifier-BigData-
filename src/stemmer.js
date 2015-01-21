db.system.js.save({_id: "myfunc", value: function(){return "hello";}})
db.system.js.save({_id: "stem",value:function (word){
		// check for zero length
		word = step1a(word);
		word = step1b(word);
		word = step1c(word);
		word = step2(word);	 
		word = step3(word);
		word = step4(word);
		word = step5a(word);
		word = step5b(word);
		return word;
	}}) // end stem
	
db.system.js.save({_id:"endsWith",value:function (str, suffix) {return str.indexOf(suffix, str.length - suffix.length) != -1;}})
db.system.js.save({_id:"step1a",value: function (word){
		// SSES -> SS
		if (endsWith(word,"sses"))
		{
			return word.substring(0, word.length - 2);
			// IES -> I
		}
		else if (endsWith(word,"ies"))
		{
			return word.substring(0, word.length - 2);
			// SS -> S
		}
		else if (endsWith(word,"ss"))
		{
			return word;
			// S ->
		}
		else if (endsWith(word,"s"))
		{
			return word.substring(0, word.length - 1);
		}
		else
		{
			return word;
		}
	}}) // end step1a

db.system.js.save({_id:"step1b",value: function step1b(word){
		// (m > 0) EED -> EE
		if (endsWith(word,"eed"))
		{
			if (measure(word.substring(0, word.length - 3)) > 0)
				return word.substring(0, word.length - 1);
			else
				return word;
			// (*v*) ED ->
		}
		else if ((endsWith(word,"ed"))
				&& (containsVowel(word.substring(0, word.length - 2))))
		{
			return step1b2(word.substring(0, word.length - 2));
			// (*v*) ING ->
		}
		else if ((endsWith(word,"ing"))
				&& (containsVowel(word.substring(0, word.length - 3))))
		{
			return step1b2(word.substring(0, word.length - 3));
		} // end if
		return word;
	}}) // end step1b

db.system.js.save({_id:"step1b2",value:function ( word){
		// AT -> ATE
		if (endsWith(word,"at") || endsWith(word,"bl") || endsWith(word,"iz"))
		{
			return word + "e";
		}
		else if ((endsWithDoubleConsonent(word))
				&& (!(endsWith(word,"l") || endsWith(word,"s") || endsWith(word,"z"))))
		{
			return word.substring(0, word.length - 1);
		}
		else if ((measure(word) == 1) && (endsWithCVC(word)))
		{
			return word + "e";
		}
		else
		{
			return word;
		}
	}}) // end step1b2

db.system.js.save({_id:"step1c",value:function( word){
		// (*v*) Y -> I
		if (endsWith(word,"y"))
		{
			if (containsVowel(word.substring(0, word.length - 1)))
				return word.substring(0, word.length - 1) + "i";
		} // end if
		return word;
	}}) // end step1c

db.system.js.save({_id:"step2",value: function ( word){
		// (m > 0) ATIONAL -> ATE
		if ((endsWith(word,"ational"))
				&& (measure(word.substring(0, word.length - 5)) > 0))
		{
			return word.substring(0, word.length - 5) + "e";
			// (m > 0) TIONAL -> TION
		}
		else if ((endsWith(word,"tional"))
				&& (measure(word.substring(0, word.length - 2)) > 0))
		{
			return word.substring(0, word.length - 2);
			// (m > 0) ENCI -> ENCE
		}
		else if ((endsWith(word,"enci"))
				&& (measure(word.substring(0, word.length - 2)) > 0))
		{
			return word.substring(0, word.length - 2);
			// (m > 0) ANCI -> ANCE
		}
		else if ((endsWith(word,"anci"))
				&& (measure(word.substring(0, word.length - 1)) > 0))
		{
			return word.substring(0, word.length - 1) + "e";
			// (m > 0) IZER -> IZE
		}
		else if ((endsWith(word,"izer"))
				&& (measure(word.substring(0, word.length - 1)) > 0))
		{
			return word.substring(0, word.length - 1);
			// (m > 0) ABLI -> ABLE
		}
		else if ((endsWith(word,"abli"))
				&& (measure(word.substring(0, word.length - 1)) > 0))
		{
			return word.substring(0, word.length - 1) + "e";
			// (m > 0) ENTLI -> ENT
		}
		else if ((endsWith(word,"alli"))
				&& (measure(word.substring(0, word.length - 2)) > 0))
		{
			return word.substring(0, word.length - 2);
			// (m > 0) ELI -> E
		}
		else if ((endsWith(word,"entli"))
				&& (measure(word.substring(0, word.length - 2)) > 0))
		{
			return word.substring(0, word.length - 2);
			// (m > 0) OUSLI -> OUS
		}
		else if ((endsWith(word,"eli"))
				&& (measure(word.substring(0, word.length - 2)) > 0))
		{
			return word.substring(0, word.length - 2);
			// (m > 0) IZATION -> IZE
		}
		else if ((endsWith(word,"ousli"))
				&& (measure(word.substring(0, word.length - 2)) > 0))
		{
			return word.substring(0, word.length - 2);
			// (m > 0) IZATION -> IZE
		}
		else if ((endsWith(word,"ization"))
				&& (measure(word.substring(0, word.length - 5)) > 0))
		{
			return word.substring(0, word.length - 5) + "e";
			// (m > 0) ATION -> ATE
		}
		else if ((endsWith(word,"ation"))
				&& (measure(word.substring(0, word.length - 3)) > 0))
		{
			return word.substring(0, word.length - 3) + "e";
			// (m > 0) ATOR -> ATE
		}
		else if ((endsWith(word,"ator"))
				&& (measure(word.substring(0, word.length - 2)) > 0))
		{
			return word.substring(0, word.length - 2) + "e";
			// (m > 0) ALISM -> AL
		}
		else if ((endsWith(word,"alism"))
				&& (measure(word.substring(0, word.length - 3)) > 0))
		{
			return word.substring(0, word.length - 3);
			// (m > 0) IVENESS -> IVE
		}
		else if ((endsWith(word,"iveness"))
				&& (measure(word.substring(0, word.length - 4)) > 0))
		{
			return word.substring(0, word.length - 4);
			// (m > 0) FULNESS -> FUL
		}
		else if ((endsWith(word,"fulness"))
				&& (measure(word.substring(0, word.length - 4)) > 0))
		{
			return word.substring(0, word.length - 4);
			// (m > 0) OUSNESS -> OUS
		}
		else if ((endsWith(word,"ousness"))
				&& (measure(word.substring(0, word.length - 4)) > 0))
		{
			return word.substring(0, word.length - 4);
			// (m > 0) ALITII -> AL
		}
		else if ((endsWith(word,"aliti"))
				&& (measure(word.substring(0, word.length - 3)) > 0))
		{
			return word.substring(0, word.length - 3);
			// (m > 0) IVITI -> IVE
		}
		else if ((endsWith(word,"iviti"))
				&& (measure(word.substring(0, word.length - 3)) > 0))
		{
			return word.substring(0, word.length - 3) + "e";
			// (m > 0) BILITI -> BLE
		}
		else if ((endsWith(word,"biliti"))
				&& (measure(word.substring(0, word.length - 5)) > 0))
		{
			return word.substring(0, word.length - 5) + "le";
		} // end if
		return word;
	}}) // end step2

db.system.js.save({_id:"step3",value: function step3( word){
		// (m > 0) ICATE -> IC
		if ((endsWith(word,"icate"))
				&& (measure(word.substring(0, word.length - 3)) > 0))
		{
			return word.substring(0, word.length - 3);
			// (m > 0) ATIVE ->
		}
		else if ((endsWith(word,"ative"))
				&& (measure(word.substring(0, word.length - 5)) > 0))
		{
			return word.substring(0, word.length - 5);
			// (m > 0) ALIZE -> AL
		}
		else if ((endsWith(word,"alize"))
				&& (measure(word.substring(0, word.length - 3)) > 0))
		{
			return word.substring(0, word.length - 3);
			// (m > 0) ICITI -> IC
		}
		else if ((endsWith(word,"iciti"))
				&& (measure(word.substring(0, word.length - 3)) > 0))
		{
			return word.substring(0, word.length - 3);
			// (m > 0) ICAL -> IC
		}
		else if ((endsWith(word,"ical"))
				&& (measure(word.substring(0, word.length - 2)) > 0))
		{
			return word.substring(0, word.length - 2);
			// (m > 0) FUL ->
		}
		else if ((endsWith(word,"ful"))
				&& (measure(word.substring(0, word.length - 3)) > 0))
		{
			return word.substring(0, word.length - 3);
			// (m > 0) NESS ->
		}
		else if ((endsWith(word,"ness"))
				&& (measure(word.substring(0, word.length - 4)) > 0))
		{
			return word.substring(0, word.length - 4);
		} // end if
		return word;
	}}) // end step3

db.system.js.save({_id:"step4",value: function ( word){
		if ((endsWith(word,"al"))
				&& (measure(word.substring(0, word.length - 2)) > 1))
		{
			return word.substring(0, word.length - 2);
			// (m > 1) ANCE ->
		}
		else if ((endsWith(word,"ance"))
				&& (measure(word.substring(0, word.length - 4)) > 1))
		{
			return word.substring(0, word.length - 4);
			// (m > 1) ENCE ->
		}
		else if ((endsWith(word,"ence"))
				&& (measure(word.substring(0, word.length - 4)) > 1))
		{
			return word.substring(0, word.length - 4);
			// (m > 1) ER ->
		}
		else if ((endsWith(word,"er"))
				&& (measure(word.substring(0, word.length - 2)) > 1))
		{
			return word.substring(0, word.length - 2);
			// (m > 1) IC ->
		}
		else if ((endsWith(word,"ic"))
				&& (measure(word.substring(0, word.length - 2)) > 1))
		{
			return word.substring(0, word.length - 2);
			// (m > 1) ABLE ->
		}
		else if ((endsWith(word,"able"))
				&& (measure(word.substring(0, word.length - 4)) > 1))
		{
			return word.substring(0, word.length - 4);
			// (m > 1) IBLE ->
		}
		else if ((endsWith(word,"ible"))
				&& (measure(word.substring(0, word.length - 4)) > 1))
		{
			return word.substring(0, word.length - 4);
			// (m > 1) ANT ->
		}
		else if ((endsWith(word,"ant"))
				&& (measure(word.substring(0, word.length - 3)) > 1))
		{
			return word.substring(0, word.length - 3);
			// (m > 1) EMENT ->
		}
		else if ((endsWith(word,"ement"))
				&& (measure(word.substring(0, word.length - 5)) > 1))
		{
			return word.substring(0, word.length - 5);
			// (m > 1) MENT ->
		}
		else if ((endsWith(word,"ment"))
				&& (measure(word.substring(0, word.length - 4)) > 1))
		{
			return word.substring(0, word.length - 4);
			// (m > 1) ENT ->
		}
		else if ((endsWith(word,"ent"))
				&& (measure(word.substring(0, word.length - 3)) > 1))
		{
			return word.substring(0, word.length - 3);
			// (m > 1) and (*S or *T) ION ->
		}
		else if ((endsWith(word,"sion") || endsWith(word,"tion"))
				&& (measure(word.substring(0, word.length - 3)) > 1))
		{
			return word.substring(0, word.length - 3);
			// (m > 1) OU ->
		}
		else if ((endsWith(word,"ou"))
				&& (measure(word.substring(0, word.length - 2)) > 1))
		{
			return word.substring(0, word.length - 2);
			// (m > 1) ISM ->
		}
		else if ((endsWith(word,"ism"))
				&& (measure(word.substring(0, word.length - 3)) > 1))
		{
			return word.substring(0, word.length - 3);
			// (m > 1) ATE ->
		}
		else if ((endsWith(word,"ate"))
				&& (measure(word.substring(0, word.length - 3)) > 1))
		{
			return word.substring(0, word.length - 3);
			// (m > 1) ITI ->
		}
		else if ((endsWith(word,"iti"))
				&& (measure(word.substring(0, word.length - 3)) > 1))
		{
			return word.substring(0, word.length - 3);
			// (m > 1) OUS ->
		}
		else if ((endsWith(word,"ous"))
				&& (measure(word.substring(0, word.length - 3)) > 1))
		{
			return word.substring(0, word.length - 3);
			// (m > 1) IVE ->
		}
		else if ((endsWith(word,"ive"))
				&& (measure(word.substring(0, word.length - 3)) > 1))
		{
			return word.substring(0, word.length - 3);
			// (m > 1) IZE ->
		}
		else if ((endsWith(word,"ize"))
				&& (measure(word.substring(0, word.length - 3)) > 1))
		{
			return word.substring(0, word.length - 3);
		} // end if
		return word;
	}}) // end step4

db.system.js.save({_id:"step5a",value :function ( word){
		// (m > 1) E ->
		if ((measure(word.substring(0, word.length - 1)) > 1)
				&& endsWith(word,"e"))
			return word.substring(0, word.length - 1);
		// (m = 1 and not *0) E ->
		else if ((measure(word.substring(0, word.length - 1)) == 1)
				&& (!endsWithCVC(word.substring(0, word.length - 1)))
				&& (endsWith(word,"e")))
			return word.substring(0, word.length - 1);
		else
			return word;
	}}) // end step5a

db.system.js.save({_id:"step5b",value: function ( word){
		// (m > 1 and *d and *L) ->
		if (endsWith(word,"l") && endsWithDoubleConsonent(word)
				&& (measure(word.substring(0, word.length - 1)) > 1))
		{
			return word.substring(0, word.length - 1);
		}
		else
		{
			return word;
		}
	}}) // end step5b

	// does wording end with 's'?
db.system.js.save({_id:"endWithS",value:function ( word){
		return endsWith(word,"s");
	}}) // end function

	// does  contain a vowel?
db.system.js.save({_id:"containsVowel",value: function ( word){
		for (var i = 0; i < word.length; i++)
		{
			return isVowel(word[i]);
		}
		// no aeiou but there is y
		if (word.indexOf('y') > -1)
			return true;
		else
			return false;
	}}) // end function

	// is char a vowel?
db.system.js.save({_id:"isVowel",value: function (c){
		if ((c == 'a') || (c == 'e') || (c == 'i') || (c == 'o') || (c == 'u'))
			return true;
		else
			return false;
	}}) // end function

	// does wording end with a double consonent?
db.system.js.save({_id:"endsWithDoubleConsonent",value: function ( word){
		var c = word[word.length - 1];
		if (c == word[word.length - 2])
			if (!containsVowel(word.substring(word.length - 2)))
			{
				return true;
			}
		return false;
	}}) // end function

	// returns a CVC measure for the wording
db.system.js.save({_id:"measure",value: function( word){
		var count = 0;
		var vowelSeen = false;
		for (var i = 0; i < word.length; i++)
		{
			if (isVowel(word[i]))
			{
				vowelSeen = true;
			}
			else if (vowelSeen)
			{
				count++;
				vowelSeen = false;
			}
		} // end for
		return count;
	}}) // end function

	// does stem end with CVC?
db.system.js.save({_id:"endsWithCVC" ,value:function ( word){
		var c, v, c2 = ' ';
		if (word.length >= 3)
		{
			c = word[word.length - 1];
			v = word[word.length - 2];
			c2 = word[word.length - 3];
		}
		else
		{
			return false;
		}

		if ((c == 'w') || (c == 'x') || (c == 'y'))
		{
			return false;
		}
		else if (isVowel(c))
		{
			return false;
		}
		else if (!isVowel(v))
		{
			return false;
		}
		else if (isVowel(c2))
		{
			return false;
		}
		else
		{
			return true;
		}
}}) // end function