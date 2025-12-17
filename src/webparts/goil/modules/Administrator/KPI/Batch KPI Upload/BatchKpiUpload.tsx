import * as React from "react";
import Card from "../../../../components/common/Card/Card";
import Button from "../../../../components/common/Button/Button";
import { Icon } from "@fluentui/react/lib/Icon";

const BatchUploadKPIs: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setErrors([]);
  };

  const handleUpload = () => {
    if (!file) {
      setErrors(["Please select a file to upload"]);
      return;
    }
    console.log("Uploading file:", file.name);
  };

  return (
    <section>
      <h1>Batch Upload KPIs</h1>
      <p className="text-muted">
        Upload multiple KPIs at once using Excel or CSV files
      </p>

      {/* Instructions */}
      <Card title="Instructions">
        <ol>
          <li>Download the template to ensure correct columns and format</li>
          <li>Fill in KPI data following the template rules</li>
          <li>Upload the completed Excel or CSV file</li>
          <li>Review and submit</li>
        </ol>

        <div className="alert alert-info mt-3">
          <strong>Tips</strong>
          <ul>
            <li>Dates must be in YYYY-MM-DD format</li>
            <li>Frequency should be Monthly, Quarterly, or Annually</li>
            <li>Required fields must not be empty</li>
          </ul>
        </div>
      </Card>

      {/* Step 1 */}
      <Card title="Step 1: Download Template">
        <div className="d-flex gap-2">
          <Button variant="primary">
            <Icon iconName="Download" /> Download Excel Template
          </Button>
          <Button variant="secondary">
            <Icon iconName="Download" /> Download CSV Template
          </Button>
        </div>
      </Card>

      {/* Step 2 */}
      <Card title="Step 2: Upload File">
        <div className="d-flex align-items-center gap-3">
          <input type="file" accept=".xlsx,.csv" onChange={handleFileChange} />
          <Button variant="success" onClick={handleUpload}>
            <Icon iconName="CloudUpload" /> Process File
          </Button>
        </div>

        {errors.length > 0 && (
          <ul className="text-danger mt-3">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* Template Field Reference */}
      <Card title="Template Field Reference">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Required</th>
              <th>Data Type</th>
              <th>Example</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>objective</td>
              <td>Yes</td>
              <td>Text</td>
              <td>Increase brand awareness</td>
              <td>Main KPI objective</td>
            </tr>
            <tr>
              <td>indicator</td>
              <td>Yes</td>
              <td>Text</td>
              <td>% increase in awareness</td>
              <td>Measurement indicator</td>
            </tr>
            <tr>
              <td>department</td>
              <td>Yes</td>
              <td>Text</td>
              <td>Marketing</td>
              <td>Owning department</td>
            </tr>
            <tr>
              <td>target</td>
              <td>Yes</td>
              <td>Number</td>
              <td>100</td>
              <td>Target value</td>
            </tr>
            <tr>
              <td>budget</td>
              <td>No</td>
              <td>Number</td>
              <td>50000</td>
              <td>Allocated budget</td>
            </tr>
            <tr>
              <td>frequency</td>
              <td>Yes</td>
              <td>Text</td>
              <td>Monthly</td>
              <td>Monthly / Quarterly / Annually</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </section>
  );
};

export default BatchUploadKPIs;
