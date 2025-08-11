import React from "react";
import "./OtherInformation.scss";
import Dropdown from "../Dropdown/Dropdown";
import TextArea from "../TextArea";
import { HelpstirFormData } from "./HelpstirForm"; // Import HelpstirFormData
import { causeOptions, areaOptions } from "./HelpstirForm"; // Import causeOptions and areaOptions

interface OtherInformationProps {
  formData: HelpstirFormData;
  errors: Partial<HelpstirFormData> | any;
  handleInputChange: (field: keyof HelpstirFormData, value: any) => void;
  handleAccountManagerChange: (field: string, value: string) => void;
}

const OtherInformation: React.FC<OtherInformationProps> = ({
  formData,
  errors,
  handleInputChange,
  handleAccountManagerChange,
}) => {
  return (
    <div className="form-section">
      <div className="form-notice">
        <span className="form-notice__icon">ⓘ</span>
        All the fields are required!
      </div>

      <div className="form-group">
        <h3 className="form-group__title">Add mission</h3>

        <div className="form-field">
          <label className="form-field__label">
            Causes of the organisation
          </label>
          <Dropdown
            options={causeOptions}
            value={formData.causes}
            onChange={(value) => handleInputChange("causes", value)}
            placeholder="Select causes"
            multiple
          />
          {errors.causes?.message && (
            <p className="error">{errors.causes.message}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-field__label">Specific areas of work</label>
          <Dropdown
            options={areaOptions}
            value={formData.specificAreas}
            onChange={(value) => handleInputChange("specificAreas", value)}
            placeholder="Select"
            multiple
          />
          {errors.specificAreas?.message && (
            <p className="error">{errors.specificAreas.message}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-field__label">Add bio</label>
          <TextArea
            value={formData.bio}
            onChange={(value) => handleInputChange("bio", value)}
            placeholder="Supporting text"
            maxLength={200}
          />
          {errors.bio?.message && <p className="error">{errors.bio.message}</p>}
        </div>
      </div>

      <div className="form-group">
        <h3 className="form-group__title">Add an account manager</h3>

        <div className="form-row">
          <div className="form-field">
            <input
              className="form-input"
              placeholder="Name"
              value={formData.accountManager.name}
              onChange={(e) =>
                handleAccountManagerChange("name", e.target.value)
              }
            />
            {errors.accountManager?.name?.message && (
              <p className="error">{errors.accountManager.name.message}</p>
            )}
          </div>
          <div className="form-field">
            <input
              className="form-input"
              type="email"
              placeholder="Email address"
              value={formData.accountManager.email}
              onChange={(e) =>
                handleAccountManagerChange("email", e.target.value)
              }
            />
            {errors.accountManager?.email?.message && (
              <p className="error">{errors.accountManager.email.message}</p>
            )}
            <span className="form-field__helper">
              Account will be managed only through this E-mail address
            </span>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              value={formData.accountManager.password}
              onChange={(e) =>
                handleAccountManagerChange("password", e.target.value)
              }
            />
            {errors.accountManager?.password?.message && (
              <p className="error">{errors.accountManager.password.message}</p>
            )}
          </div>
          <div className="form-field">
            <input
              className="form-input"
              type="password"
              placeholder="Confirm password"
              value={formData.accountManager.confirmPassword}
              onChange={(e) =>
                handleAccountManagerChange("confirmPassword", e.target.value)
              }
            />
            {errors.accountManager?.confirmPassword?.message && (
              <p className="error">
                {errors.accountManager.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtherInformation;
