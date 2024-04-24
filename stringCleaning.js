//? String manipulation assignment (UpWork)

const hierarchy = [
  "Group",
  "Category",
  "Subcategory",
  "Make",
  "Model",
  "Diagram",
];

function findCombinationsFromText(str = "") {
  const finalString = cleanString(str);

  if (finalString === -1) {
    return [];
  }

  const products = finalString.split(", ");

  products.sort((a, b) => {
    const tagA = a.split("_")[0];
    const tagB = b.split("_")[0];

    return hierarchy.indexOf(tagA) - hierarchy.indexOf(tagB);
  });

  //! FOCUS

  function createNestedArrays(arr) {
    const result = [];
    const reversedArr = arr.slice().reverse();

    for (let i = 0; i < arr.length; i++) {
      result.push(reversedArr.slice(i).reverse());
    }
    return result;
  }

  const result = createNestedArrays(products);

  return result;
}

//Helpers
function addHyphensBeforeCapitals(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (char === char.toUpperCase() && char !== char.toLowerCase() && i !== 0) {
      let prevChar = str[i - 1];

      if (prevChar !== "_" && prevChar !== " ") {
        result += "-";
      }
    }

    result += char;
  }

  return result;
}

function cleanString(str) {
  let cleaned = "";

  //!UPPER BOUND
  cleaned = str.replace(/[^a-zA-Z0-9_/-]/g, "");
  console.log(cleaned);

  function validateTags(str) {
    const regex = /([A-Z][a-z]*)[^A-Z]*_/g;
    let match;

    while ((match = regex.exec(str)) !== null) {
      const tag = match[1]; // Extract the tag from the match
      // If the tag extracted is not in the list of valid hierarchy tags, return -1
      if (!hierarchy.includes(tag)) {
        return -1; // Invalid tag found
      }
    }
  }

  //! HERE
  if (validateTags(cleaned) === -1) {
    return -1;
  }

  //console.log(validateTags(cleaned));

  //!LOWER BOUND
  cleaned = str.replace(/[^a-zA-Z0-9]/g, "");

  hierarchy.forEach((tag) => {
    // This creates a dynamic RegExp to find the tag and directly append an underscore after it
    let regex = new RegExp(tag, "g");
    cleaned = cleaned.replace(regex, (match) => match + "_");
  });

  let hierarchyIndexes = [];
  for (let i = 0; i < hierarchy.length; i++) {
    if (cleaned.indexOf(hierarchy[i]) != cleaned.lastIndexOf(hierarchy[i])) {
      hierarchyIndexes = null;
      break;
    }
    if (cleaned.includes(hierarchy[i])) {
      hierarchyIndexes.push(cleaned.indexOf(hierarchy[i]));
    } else {
      continue;
    }
  }

  if (hierarchyIndexes === null) {
    return -1;
  }

  console.log(hierarchyIndexes);

  let cleanedSplit = cleaned.split("");

  for (let i = 0, j = 0; i < hierarchyIndexes.length; i++) {
    if (hierarchyIndexes[i] != 0) {
      cleanedSplit.splice(hierarchyIndexes[i] + j, 0, ", ");
      j++;
    }
  }

  cleaned = cleanedSplit.join("");
  cleaned = addHyphensBeforeCapitals(cleaned);

  return cleaned;
}
