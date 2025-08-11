import React from "react";
import "./BasicDetails.scss";
import Checkbox from "../Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import { HelpstirFormData } from "./HelpstirForm"; // Import HelpstirFormData
import { stateOptions } from "./HelpstirForm"; // Import stateOptions

interface BasicDetailsProps {
  formData: HelpstirFormData;
  errors: Partial<HelpstirFormData> | any;
  handleInputChange: (field: keyof HelpstirFormData, value: any) => void;
  handleParentOrgChange: (field: string, value: string) => void;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({
  formData,
  errors,
  handleInputChange,
  handleParentOrgChange,
}) => {
  return (
    <div className="form-section">
      {/* <div className="form-notice">
        <span className="form-notice__icon">ⓘ</span>
        All the fields are required!
      </div> */}

      <div className="form-group">
        <h3 className="form-grouptitle">Enter organisation details</h3>
        <div className="form-field">
          <input
            className="form-input"
            placeholder="Name of the Organisation"
            value={formData.organizationName}
            onChange={(e) =>
              handleInputChange("organizationName", e.target.value)
            }
          />
          {errors.organizationName?.message && (
            <p className="error">{errors.organizationName.message}</p>
          )}
        </div>

        <div className="form-field">
          <input
            className="form-input"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          {errors.email?.message && (
            <p className="error">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <h3 className="form-grouptitle">Add Address</h3>
          <div className="form-field">
            <input
              className="form-input"
              placeholder="Registered Address"
              value={formData.registeredAddress}
              onChange={(e) =>
                handleInputChange("registeredAddress", e.target.value)
              }
            />
            {errors.registeredAddress?.message && (
              <p className="error">{errors.registeredAddress.message}</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-field">
              <input
                className="form-input"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
              {errors.city?.message && (
                <p className="error">{errors.city.message}</p>
              )}
            </div>
            <div className="form-field">
              <input
                className="form-input"
                placeholder="Pin Code"
                value={formData.pinCode}
                onChange={(e) => handleInputChange("pinCode", e.target.value)}
              />
              {errors.pinCode?.message && (
                <p className="error">{errors.pinCode.message}</p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <Dropdown
                options={stateOptions}
                value={formData.state}
                onChange={(value) => handleInputChange("state", value)}
                placeholder="State/UT"
              />
              {errors.state?.message && (
                <p className="error">{errors.state.message}</p>
              )}
            </div>
            <div className="form-field">
              <input
                className="form-input"
                placeholder="Mobile No."
                value={formData.mobileNo}
                onChange={(e) => handleInputChange("mobileNo", e.target.value)}
              />
              {errors.mobileNo?.message && (
                <p className="error">{errors.mobileNo.message}</p>
              )}
            </div>
          </div>

          <div className="form-field">
            <input
              className="form-input"
              placeholder="Location pin"
              value={formData.locationPin}
              onChange={(e) => handleInputChange("locationPin", e.target.value)}
            />
            {errors.locationPin?.message && (
              <p className="error">{errors.locationPin.message}</p>
            )}
          </div>

          <Checkbox
            checked={formData.hasParentOrg}
            text="Has a parent organisation"
            onChange={(checked) => handleInputChange("hasParentOrg", checked)}
          />

          {formData.hasParentOrg && (
            <>
              <div className="form-row">
                <div className="form-field">
                  <input
                    className="form-input"
                    placeholder="Name of Parent Organisation"
                    value={formData.parentOrg?.name || ""}
                    onChange={(e) =>
                      handleParentOrgChange("name", e.target.value)
                    }
                  />
                  {errors.parentOrg?.name?.message && (
                    <p className="error">{errors.parentOrg.name.message}</p>
                  )}
                </div>
                <div className="form-field">
                  <input
                    className="form-input"
                    type="email"
                    placeholder="Email address of Parent Organisation"
                    value={formData.parentOrg?.email || ""}
                    onChange={(e) =>
                      handleParentOrgChange("email", e.target.value)
                    }
                  />
                  {errors.parentOrg?.email?.message && (
                    <p className="error">{errors.parentOrg.email.message}</p>
                  )}
                </div>
              </div>
              <div className="form-field">
                <input
                  className="form-input"
                  placeholder="Full address of Parent Organisation"
                  value={formData.parentOrg?.address || ""}
                  onChange={(e) =>
                    handleParentOrgChange("address", e.target.value)
                  }
                />
                {errors.parentOrg?.address?.message && (
                  <p className="error">{errors.parentOrg.address.message}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
