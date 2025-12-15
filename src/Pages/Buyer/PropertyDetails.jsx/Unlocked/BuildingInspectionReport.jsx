import React from "react";

function BuildingInspectionReport() {
  return (
    <div className="bg-[#1a2a38] min-h-screen flex justify-center items-start py-8 px-2">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-7">
        <div className="text-xl font-extrabold text-slate-800 mb-1">
          Building Inspection Report
        </div>
        <div className="text-xs text-slate-500 mb-5">
          Property Inspection Report • Date: December 8, 2025
        </div>

        <div className="text-lg font-bold text-slate-800 mb-2">
          Executive Summary
        </div>
        <div className="text-slate-700 text-sm mb-4">
          This comprehensive inspection was conducted on the property and
          includes a detailed assessment of all major structural components,
          systems, and safety features. The property has been found to be in
          good overall condition with only minor maintenance items noted.
        </div>

        <div className="bg-green-100 border border-green-200 rounded-lg px-4 py-3 mb-5">
          <span className="font-bold text-green-700 text-base">
            Overall Assessment: SATISFACTORY
          </span>
          <div className="text-green-700 text-xs mt-1">
            No major defects identified. Property meets all safety and
            compliance standards.
          </div>
        </div>

        <div className="text-base font-bold text-slate-800 mb-2">
          Key Findings
        </div>
        <ul className="mb-4 text-sm">
          <li className="mb-2">
            <span className="font-bold text-green-600">
              • Structural Integrity
            </span>
            <br />
            <span className="text-slate-700">
              All major structural elements, including foundation, walls, and
              roof are in good condition.
            </span>
          </li>
          <li className="mb-2">
            <span className="font-bold text-green-600">
              • Electrical Systems
            </span>
            <br />
            <span className="text-slate-700">
              Wiring and electrical systems meet current safety standards.
              Switchboard compliant.
            </span>
          </li>
          <li className="mb-2">
            <span className="font-bold text-green-600">
              • Plumbing & Drainage
            </span>
            <br />
            <span className="text-slate-700">
              All plumbing fixtures operational. No leaks detected. Drainage
              systems functioning properly.
            </span>
          </li>
          <li>
            <span className="font-bold text-yellow-600">• Minor Items</span>
            <br />
            <span className="text-slate-700">
              Minor cosmetic repairs recommended. Gutter cleaning advised for
              optimal maintenance.
            </span>
          </li>
        </ul>

        <div className="text-base font-bold text-slate-800 mb-2">
          Detailed Assessment
        </div>
        <div className="mb-3">
          <div className="font-bold text-slate-700">
            Foundation & Substructure
          </div>
          <div className="text-slate-700 text-sm mb-2">
            The foundation was inspected and found to be structurally sound with
            no evidence of significant cracking, movement, or moisture issues.
          </div>
          <div className="bg-slate-100 rounded px-3 py-2 text-xs text-slate-500">
            Status: Satisfactory • Inspector: J. Brown • Compliance AS 2870-2011
          </div>
        </div>
        <div className="mb-3">
          <div className="font-bold text-slate-700">Roof & Exterior</div>
          <div className="text-slate-700 text-sm mb-2">
            Roof covering is in good condition. Flashings and penetrations
            properly sealed. Gutters and downpipes functional and debris found
            in guttering.
          </div>
          <div className="bg-slate-100 rounded px-3 py-2 text-xs text-slate-500">
            Status: Satisfactory • Inspector: A. Smith
          </div>
        </div>
        <div className="mb-3">
          <div className="font-bold text-slate-700">Interior Spaces</div>
          <div className="text-slate-700 text-sm mb-2">
            All interior rooms inspected. Walls, ceilings, and floors in good
            condition. Doors and windows operate correctly with good seals.
          </div>
          <div className="bg-slate-100 rounded px-3 py-2 text-xs text-slate-500">
            Status: Satisfactory • Inspector: J. Smith
          </div>
        </div>

        <div className="text-base font-bold text-slate-800 mb-2">
          Recommendations
        </div>
        <ul className="list-decimal pl-5 text-slate-700 text-sm mb-5">
          <li>
            Schedule routine gutter cleaning annually to maintain proper
            drainage.
          </li>
          <li>
            Consider repairing ornamental timber window frames for weather
            proofing.
          </li>
          <li>
            Maintain regular servicing of heating/cooling systems as per
            manufacturer’s recommendations.
          </li>
        </ul>

        <div className="flex flex-wrap gap-8 mt-6 text-xs text-slate-600">
          <div>
            <div className="font-bold text-slate-700 mb-1">
              Inspector Details
            </div>
            <div>John Smith</div>
            <div>Licensed Building Inspector</div>
            <div>License # IB-12345</div>
          </div>
          <div>
            <div className="font-bold text-slate-700 mb-1">Report Details</div>
            <div>Report Date: Dec 8, 2025</div>
            <div>Inspection Date: Dec 1, 2025</div>
            <div>Pages: 24</div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 mt-8">
          This is a simulated PDF document for demonstration purposes.
        </div>
      </div>
    </div>
  );
}

export default BuildingInspectionReport;
