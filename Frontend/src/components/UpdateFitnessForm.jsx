import React from "react";

const UpdateFitnessForm = ({
  currentData,
  handleChange,
  handleUpdateSubmit,
  closeModal,
}) => {
  return (
    <form onSubmit={handleUpdateSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <input
          type="number"
          name="weight"
          value={currentData.weight}
          onChange={handleChange}
          placeholder="Weight"
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="number"
          name="age"
          value={currentData.age}
          onChange={handleChange}
          placeholder="Age"
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="number"
          name="sugarLevel"
          value={currentData.sugarLevel}
          onChange={handleChange}
          placeholder="Sugar Level"
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="text"
          name="bloodPressure"
          value={currentData.bloodPressure}
          onChange={handleChange}
          placeholder="Blood Pressure"
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="number"
          name="heartRate"
          value={currentData.heartRate}
          onChange={handleChange}
          placeholder="Heart Rate"
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="number"
          name="cholesterolLevel"
          value={currentData.cholesterolLevel}
          onChange={handleChange}
          placeholder="Cholesterol Level"
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="number"
          name="exerciseDuration"
          value={currentData.exerciseDuration}
          onChange={handleChange}
          placeholder="Exercise Duration"
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Update
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateFitnessForm;
