
function algoritmoAnalisis(declaration) {
  let stack = generarStack(declaration);
  let stackContent = [];
  let apuntador = 0;

  const popInfo = (X) => {
    stackContent.push(
      `Pop: ${X}, stackContent: ${[...stack]}, Cadena : ${declaration.slice(
        apuntador
      )}`
    );
  };

  while (stack.length > 0) {
    const X = stack.pop();

    if (!X) {
      break;
    }

    const a = declaration[apuntador];

    if (X === a) {
      apuntador++;
    } else if (obtenerNT(X)) {
      const production = obtenerProduccion(X, a);

      if (production) {
        stackContent.push(
          `Push: ${X}, stackContent: ${[
            ...stack,
          ]}, Cadena : ${declaration.slice(apuntador)}`
        );
        if (production[0] !== "ε") {
          for (let i = production.length - 1; i >= 0; i--) {
            stack.push(production[i]);
          }
        }
      } else {
        stackContent.push(`Error: ${X} no tiene produccion.`);
        return { result: false, stackContent };
      }
    } else {
      popInfo(X);
      return { result: false, stackContent };
    }
  }
  const isValid = apuntador === declaration.length && stack.length === 0;
  return { result: isValid, stackContent };
}

function generarStack(declaration) {
  if (declaration.includes("if")) {
    return ["IFG"];
  } else if (declaration.includes("for")) {
    return ["FOR"];
  } else if (declaration.includes("while")) {
    return ["WH"];
  }else if (declaration.includes("function")) {
    return ["FUNC"];
  } else if (declaration.includes("num")) {
    return ["TVARN"];
  } else if (declaration.includes("string")) {
    return ["TVARS"];
  } else if (declaration.includes("float")) {
    return ["TVARF"];
  }

  else {
    return [""];
  }
}

function obtenerProduccion(noTerminal, next) {
  switch (noTerminal) {
    case "L":
      if (/[a-z0-9_]/.test(next)) {
        return [next];
      }
    case "RL":
      return /[a-zA-Z]/.test(next) ? ["L", "RL"] : ["ε"];
    case "D":
      if (/[0-9]/.test(next)) {
        return [next];
      }
    case "C":
      return ['"']
    case "CORA":
        return ["{"]
    case "FO":
      return ["f","o","r"]
    case "CORC":
        return ["}"]
    case "RD":
      return /[0-9]/.test(next) ? ["D", "RD"] : ["ε"];
    case "TVS":
      return ["s", "t", "r", "i", "n", "g"];
    case "TVF":
      return ["f", "l", "o", "a", "t"];
    case "PRI":
      return ["i", "f"];
    case "MY":
      return [">"]
    case "COND":
      return  /[=]/.test(next) ? ["IG","CONIII"] : /[>]/.test(next) ? ["MY","CONMYI"] : ["<"];
    case "CONIII": 
      return /[=]/.test(next) ? ["="] : ["<"];
    case "CONMYI":
      return /[=]/.test(next) ? ["="] : [];

        /* if (/[=]/.test(next)) {
            return ["=", "="];
        }
          else if (/['<']/.test(next)){
            return ('<')
          }
          else if (/[>]/.test(next)) {
            return [">"];
          } else if (/['=<']/.test(next)) {
            return ["=", "<"];
          }
          else if (/['=>']/.test(next)) {
            return ["=", ">"];
          }  */

    case "DP":
      return [":"]
    case "EL":
        return ["e", "l", "s", "e"]
    case "W":
        return ['w','h','i','l','e']
    case "CS":
          return [","]
    case "PAR1":
        return ["("]
    case "PAR2":
        return [")"]
    case "MAS":
          return ["+","+"]
    case "MEN":
            return ["-","-"]
    case "IG":
      return ["="];
    case "F":
      return ["f","u","n","c","t","i","o","n"]
    case "P":
      return ["."];
    case "PYC":
      return [";"];
    case "TVN":
      return ["n", "u", "m"];
    case "TVARN":
      return ["TVN", "C1"];
    case "C1":
      return ["L", "C2"];
    case "C2":
      return ["RL", "C3"];
    case "C3":
      return next === "=" ? ["IG", "C4"] : ["PYC"];
    case "C4":
      return ["D", "C5"];
    case "C5":
      return ["RD", "PYC"];
    case "TVARS":
      return ["TVS", "S1"];
    case "S1":
      return ["L", "S2"];
    case "S2":
      return ["RL", "S3"];
    case "S3":
      return next === "=" ? ["IG", "S4"] : ["PYC"];
    case "S4":
      return ["C", "S5"];
    case "S5":
      return ["L", "S6"];
    case "S6":
      return ["RL", "S7"];
    case "S7":
      return ["C", "PYC"];
    case "TVARF":
      return ["TVF", "X1"];
    case "X1":
      return ["L", "X2"];
    case "X2":
      return ["RL", "X3"];
    case "X3":
      return next === "=" ? ["IG", "X4"] : ["PYC"];
    case "X4":
      return ["D", "X5"];
    case "X5":
      return ["RD", "X6"];
    case "X6":
      return ["P", "X7"];
    case "X7":
      return ["D", "X8"];
    case "X8":
      return ["RD", "PYC"];
    //declarando if
    case "IFG":
      return ["PRI", "I1"];
    case "I1":
      return ["PAR1", "I2"];
    case "I2":
      return ["L", "I3"];
    case "I3":
      return ["RL", "I4"];
    case "I4":
      return ["COND", "I5"];
    case "I5":
      return ["D", "I6"];
    case "I6":
      return ["RD", "I7"];
    case "I7":
      return ["PAR2", "I8"];
    case "I8":
      return ["CORA", "I9"];
    case "I9":
      return ["CORC", "I10"];
    case "I10":
      return ["EL", "I11"];
    case "I11":
      return ["CORA", "CORC"];
      case "WH":
        return ["W", "W1"];
      case "W1":
        return ["PAR1", "W2"];
      case "W2":
        return ["L", "W3"];
      case "W3":
        return ["RL", "W4"];
      case "W4":
        return ["COND", "W5"];
      case "W5":
        return ["D", "W6"];
      case "W6":
        return ["RD", "W7"];
      case "W7":
        return ["PAR2", "W8"];
      case "W8":
        return ["CORA", "W9"];
      case "W9":
        return ["CORC"];
      

        case "FOR":
          return ["FO", "F1"];
        case "F1":
          return ["PAR1", "F2"];
        case "F2":
          return ["L", "F3"];
        case "F3":
          return ["RL", "F4"];
        case "F4":
          return ["COND", "F5"];
        case "F5":
          return ["D", "F6"];
        case "F6":
          return ["RD", "F7"];
        case "F7":
          return ["PYC", "F8"];
        case "F8":
          return ["L", "F9"];
        case "F9":
          return ["RL", "F10"];
        case "F10":
          if (/\+/.test(next)) {
            return ["MAS", "F11"];
          } else if (/\-/.test(next)) {
            return ["MEN", "F11"];
          } else {
            return [];
          }
        case "F11":
          return ["PAR2", "F12"];
        case "F12":
          return ["CORA", "CORC"];
          case "FUNC":
            return ["F", "FUN1"];
          case "FUN1":
            return ["L", "FUN2"];
          case "FUN2":
            return ["RL", "FUN3"];
          case "FUN3":
            return ["PAR1", "FUN4"];
          case "FUN4":
            return ["L", "FUN5"];
          case "FUN5":
            return ["RL", "FUN6"];
          case "FUN6":
            return ["DP", "FUN7"];
          case "FUN7":
            return  /[n]/.test(next) ? ["TVN", "FUN8"] : /[f]/.test(next) ? ["TVF", "FUN8"] : ["TVS", "FUN8"];
/*             if (["s", "t", "r", "i", "n", "g"].includes(next[0])) {
              return ["TVS", "FUN8"];
            } else if (["n", "u", "m"].includes(next[0])) {
              return ["TVN", "FUN8"];
            } else if (["f", "l", "o", "a", "t"].includes(next[0])) {
              return ["TVF", "FUN8"];
            } else {
              return [];
            } */
          case "FUN8":
            return ["CS", "FUN9"];
          case "FUN9":
            return ["L", "FUN10"];
          case "FUN10":
            return ["RL", "FUN11"];
          case "FUN11":
            return ["DP", "FUN12"];
          case "FUN12":
            return  /[n]/.test(next) ? ["TVN", "FUN13"] : /[f]/.test(next) ? ["TVF", "FUN13"] : ["TVS", "FUN13"];
            /* if (["s", "t", "r", "i", "n", "g"].includes(next[0])) {
              return ["TVS", "FUN13"];
            } else if (["n", "u", "m"].includes(next[0])) {
              return ["TVN", "FUN13"];
            } else if (["f", "l", "o", "a", "t"].includes(next[0])) {
              return ["TVF", "FUN13"];
            } else {
              return [];
            } */
          case "FUN13":
            return ["PAR2", "FUN14"];
          case "FUN14":
            return ["DP", "FUN15"];
          case "FUN15":
            return  /[n]/.test(next) ? ["TVN", "FUN16"] : /[f]/.test(next) ? ["TVF", "FUN16"] : ["TVS", "FUN16"];
          case "FUN16":
            return ["CORA", "CORC"];

    default:
      return [];
  }
}

function obtenerNT(simbolo) {
  return /[A-Z]/.test(simbolo);
}

export function validateVariableDeclaration(value) {
  const declarationWithoutSpaces = value.replace(/\s/g, '');
  const { result, stackContent } = algoritmoAnalisis(declarationWithoutSpaces);
  
  const validationMessage = {
    success: result,
    message: result ? 'Cadena válida' : 'Cadena no válida',
    stackContent: stackContent
  };
  
  console.log(validationMessage);
  
  return validationMessage;
}
