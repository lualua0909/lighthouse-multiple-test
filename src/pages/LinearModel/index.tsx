/**
 * Linear Model Visualization Page
 * 
 * This page allows users to visualize and interact with a simple linear regression model.
 * 
 * Usage Instructions:
 * 1. Training Data:
 *    - Enter an X value in the input field and click "Add Point" to add a new training data point.
 *    - The Y value is automatically calculated as 2 * X (y = 2x).
 * 
 * 2. Model Training:
 *    - Adjust the Learning Rate (default: 0.01) to control the step size in gradient descent.
 *    - Set the number of Epochs (default: 100) to control the number of training iterations.
 *    - Click "Train Model" to start the training process.
 * 
 * 3. Making Predictions:
 *    - Enter an X value in the prediction input field.
 *    - Click "Predict" to see the model's prediction for the given input.
 * 
 * 4. Visualization:
 *    - The chart displays both the training data points and the model's predictions.
 *    - The table below the chart shows the current training data and model parameters.
 */

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Custom hook for linear model
const useLinearModel = (inputSize: number) => {
  const [weights, setWeights] = useState<number[]>(Array(inputSize).fill(0));
  const [bias, setBias] = useState<number>(0);
  const [trainingHistory, setTrainingHistory] = useState<{ weights: number[], bias: number, error: number }[]>([]);

  const predict = (input: number[]): number => {
    let sum = bias;
    for (let i = 0; i < input.length; i++) {
      sum += weights[i] * input[i];
    }
    return sum;
  };

  const train = (X: number[][], y: number[], learningRate: number = 0.01, epochs: number = 100) => {
    const history: { weights: number[], bias: number, error: number }[] = [];
    let currentWeights = [...weights];
    let currentBias = bias;

    for (let epoch = 0; epoch < epochs; epoch++) {
      let totalError = 0;
      let gradientWeights = Array(currentWeights.length).fill(0);
      let gradientBias = 0;

      for (let i = 0; i < X.length; i++) {
        const prediction = predict(X[i]);
        const error = y[i] - prediction;
        totalError += error * error;

        // Compute gradients for weights and bias
        for (let j = 0; j < currentWeights.length; j++) {
          gradientWeights[j] += -2 * error * X[i][j];
        }
        gradientBias += -2 * error;
      }

      // Update weights and bias using the gradients
      for (let j = 0; j < currentWeights.length; j++) {
        currentWeights[j] -= learningRate * gradientWeights[j] / X.length;
      }
      currentBias -= learningRate * gradientBias / X.length;

      // Record training history
      history.push({
        weights: [...currentWeights],
        bias: currentBias,
        error: totalError / X.length
      });
    }

    setWeights(currentWeights);
    setBias(currentBias);
    setTrainingHistory(history);
  };

  return {
    weights,
    bias,
    trainingHistory,
    predict,
    train
  };
};

export default function LinearModelPage() {
  const [inputValue, setInputValue] = useState<string>(''); // Parameter: User input for prediction
  const [trainingData, setTrainingData] = useState<{ x: number[], y: number[] }>({ // Parameter: Training data points
    x: [1, 2, 3, 4, 5],
    y: [2, 4, 6, 8, 10]
  });
  const [learningRate, setLearningRate] = useState<number>(0.01); // Hyperparameter: Controls the step size in gradient descent
  const [epochs, setEpochs] = useState<number>(100); // Hyperparameter: Number of training iterations
  const [prediction, setPrediction] = useState<number | null>(null); // Parameter: Stores the model's prediction

  const model = useLinearModel(1);

  const trainModel = () => {
    const X = trainingData.x.map(x => [x]);
    model.train(X, trainingData.y, learningRate, epochs);
  };

  const handlePredict = () => {
    if (inputValue) {
      const input = [parseFloat(inputValue)];
      const result = model.predict(input);
      setPrediction(result);
    }
  };

  const addTrainingPoint = () => {
    if (inputValue) {
      const x = parseFloat(inputValue);
      const y = 2 * x; // Example: y = 2x
      setTrainingData(prev => ({
        x: [...prev.x, x],
        y: [...prev.y, y]
      }));
      setInputValue('');
    }
  };

  const chartData = {
    labels: trainingData.x,
    datasets: [
      {
        label: 'Training Data',
        data: trainingData.y,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 5,
      },
      {
        label: 'Model Prediction',
        data: trainingData.x.map(x => model.predict([x])),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 5,
      }
    ]
  };

  return (
    <div className="bg-gray-800 w-full h-full min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-white text-3xl font-bold">Linear Model Visualization</h1>
          
          {/* Training Data Input */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-white text-xl mb-4">Training Data</h2>
            <div className="flex gap-4 mb-4">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter X value"
                className="bg-gray-600 text-white px-4 py-2 rounded"
              />
              <button
                onClick={addTrainingPoint}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Point
              </button>
            </div>
            
            <div className="flex gap-4 mb-4">
              <div>
                <label className="text-white block mb-2">Learning Rate</label>
                <input
                  type="number"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  step="0.001"
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-white block mb-2">Epochs</label>
                <input
                  type="number"
                  value={epochs}
                  onChange={(e) => setEpochs(parseInt(e.target.value))}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                />
              </div>
            </div>
            
            <button
              onClick={trainModel}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Train Model
            </button>
          </div>

          {/* Model Information */}
          {model.trainingHistory.length > 0 && (
            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-white text-xl mb-4">Model Information</h2>
              <div className="text-white">
                <p>Weight: {model.weights[0].toFixed(4)}</p>
                <p>Bias: {model.bias.toFixed(4)}</p>
                <p>Final Error: {model.trainingHistory[model.trainingHistory.length - 1].error.toFixed(4)}</p>
              </div>
            </div>
          )}

          {/* Prediction */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-white text-xl mb-4">Make Prediction</h2>
            <div className="flex gap-4">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter X value"
                className="bg-gray-600 text-white px-4 py-2 rounded"
              />
              <button
                onClick={handlePredict}
                className="bg-purple-500 text-white px-4 py-2 rounded"
              >
                Predict
              </button>
            </div>
            {prediction !== null && (
              <p className="text-white mt-4">Prediction: {prediction.toFixed(4)}</p>
            )}
          </div>

          {/* Visualization */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-white text-xl mb-4">Model Visualization</h2>
            <div className="bg-white p-4 rounded">
              <Line data={chartData} />
            </div>
          </div>

          {/* Data and Parameters Table */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-white text-xl mb-4">Training Data and Parameters</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-600 text-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2">X</th>
                    <th className="px-4 py-2">Y</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingData.x.map((x, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{x}</td>
                      <td className="px-4 py-2">{trainingData.y[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <h3 className="text-white text-lg mb-2">Model Parameters</h3>
              <table className="min-w-full bg-gray-600 text-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Parameter</th>
                    <th className="px-4 py-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">Weight</td>
                    <td className="px-4 py-2">{model.weights[0].toFixed(4)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Bias</td>
                    <td className="px-4 py-2">{model.bias.toFixed(4)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Learning Rate</td>
                    <td className="px-4 py-2">{learningRate}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Epochs</td>
                    <td className="px-4 py-2">{epochs}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
