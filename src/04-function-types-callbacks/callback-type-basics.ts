import assert from 'node:assert/strict';

type JobStatus = 'queued' | 'running' | 'done';

type Job = {
  readonly id: string;
  readonly title: string;
  readonly status: JobStatus;
};

type JobListener = (job: Job, nextStatus: JobStatus) => void;

function updateJobStatus(job: Job, nextStatus: JobStatus, onUpdated: JobListener): Job {
  // callback は、処理の途中や完了後に呼び出す関数として渡される。
  // TypeScript では、その callback が受け取る値と戻り値も型で表す。
  // ここでは onUpdated が Job と次の status を受け取り、戻り値を利用しないため void としている。
  const updatedJob: Job = {
    ...job,
    status: nextStatus,
  };

  onUpdated(updatedJob, nextStatus);

  return updatedJob;
}

export function runCallbackTypeBasics(): void {
  console.log('このファイルでは、callback の型を確認する。');

  const job: Job = {
    id: 'job-001',
    title: 'ドキュメント生成',
    status: 'queued',
  };

  const logs: string[] = [];

  const listener: JobListener = (updatedJob, nextStatus) => {
    // listener の引数型は JobListener から決まる。
    // updatedJob は Job、nextStatus は JobStatus として推論されるため、
    // callback の中でも安全にプロパティや union 型の値を扱える。
    logs.push(`${updatedJob.id}:${nextStatus}`);
  };

  const updatedJob = updateJobStatus(job, 'running', listener);

  console.log('1. callback を受け取る関数');
  console.log('updatedJob:', updatedJob);
  console.log('logs:', logs);

  assert.deepEqual(updatedJob, {
    id: 'job-001',
    title: 'ドキュメント生成',
    status: 'running',
  });
  assert.deepEqual(logs, ['job-001:running']);
}
