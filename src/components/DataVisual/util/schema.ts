export interface DataPoint {
    time: string;
    signal1: number;
    signal2: number;
    signal3: number;
    signal4: number;
    signal5: number;
}

export interface SignalProps {
    chartData: DataPoint[];
}

export interface SignalData {
    time: string; // or use Date if you prefer
    signals: number[]; // assuming signals is an array of numbers
}

export class CircularBuffer<T> {
    private buffer: T[];
    private start = 0;
    private size = 0;

    constructor(private capacity: number) {
        this.buffer = new Array(capacity);
    }

    push(item: T): void {
        if (this.size < this.capacity) {
            this.buffer[(this.start + this.size) % this.capacity] = item;
            this.size++;
        } else {
            this.buffer[this.start] = item;
            this.start = (this.start + 1) % this.capacity;
        }
    }

    getItems(): T[] {
        return [
            ...this.buffer.slice(this.start, this.start + this.size),
            ...this.buffer.slice(
                0,
                Math.max(0, this.size - (this.capacity - this.start))
            ),
        ];
    }
}
