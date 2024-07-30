function wrap(text, tag) {
  return `<${tag}>${text}</${tag}>`;
}

function isTag(text, tag) {
  return text.startsWith(`<${tag}>`);
}

function isList(markdown){
  if (markdown.startsWith('*')){
    return true;
  }else{
    return false;
  }
}

function countMatchingChars(str, char) {
  return str.split('').findIndex(c => c !== char);
}

function parser(markdown, delimiter, tag) {
  const pattern = new RegExp(`${delimiter}(.+)${delimiter}`);
  const replacement = `<${tag}>$1</${tag}>`;
  return markdown.replace(pattern, replacement);
}

function parseTags(tagObject, markdown){
  let parsedText = markdown;
  for (const [tag, delimiter] of Object.entries(tagObject)) {
    parsedText = parser(parsedText, delimiter, tag);
  }
  return parsedText;
}

function parseText(markdown) {
  return parseTags(
    {
      'strong' : '__',
      'em' : '_' 
    },
    markdown
  );
}

function parseHeader(markdown) {
  let headerType = countMatchingChars(markdown,'#');
  if (headerType > 0 && headerType < 7) {
    return wrap(markdown.substring(headerType + 1), `h${headerType}`);
  }
  return null;
}

function parseLineItem(markdown) {
  if (markdown.startsWith('*')) {
    return wrap(parseText(markdown.substring(2)), 'li');
  }
  return null;
}

function parseParagraph(markdown) {
  return wrap(parseText(markdown),'p');
}

function parseLine(markdown) {
  
  const parsers = [parseHeader, parseLineItem, parseParagraph];
  
  for (const parser of parsers) {
    const result = parser(markdown);
    if (result !== null) {
      return result;
    }
  }
  throw new Error('Invalid markdown');
}


export function parse(markdown) {
  let result = '';
  let previousLineIsListItem = false;

  const lines = markdown.split('\n');

  for (const line of lines) {
    const parsedLine = parseLine(line);

    if (isList(line)) {
      if (!previousLineIsListItem) {
        previousLineIsListItem = true;
        result += '<ul>';
      }
      result += parsedLine;
    } else {
      if (previousLineIsListItem) {
        previousLineIsListItem = false;
        result += '</ul>';
      }
      result += parsedLine;
    }
  }

  if (previousLineIsListItem) {
    result += '</ul>';
  }
  
  return result;
}
