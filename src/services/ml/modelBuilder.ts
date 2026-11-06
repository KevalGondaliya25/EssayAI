import * as tf from '@tensorflow/tfjs';
import type { ProcessedEssayData } from '../preprocessing/datasetBuilder';

export async function createModel() {
  const model = tf.sequential();
  
  // Input layer for essay features
  model.add(tf.layers.dense({
    units: 64,
    activation: 'relu',
    inputShape: [4] // wordCount, avgSentenceLength, uniqueWords, complexWords
  }));
  
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
  
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });
  
  return model;
}