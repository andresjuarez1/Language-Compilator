import React, { useCallback, useState } from "react";
import { validateVariableDeclaration } from "../src/gramatica.js";

export default function CodeEditor() {
  const [validationResult, setValidationResult] = useState(null);

  const onChange = useCallback((value) => {
    const result = validateVariableDeclaration(value);
    setValidationResult(result);
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse ">
        <div className="lg:text-left max-w-max mb-[1000px] ">
          <textarea
            className="border p-2"
            rows={10}
            onChange={(e) => onChange(e.target.value)}
          />
          {validationResult && (
            <>
              <div className="bg-red-100 text-purple-500 p-4 mt-4">
                {validationResult.message}
              </div>
              <div className="bg-red-100 text-black p-4 mt-14">
                {validationResult.stackContent.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
