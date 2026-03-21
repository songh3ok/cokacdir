import { motion } from 'framer-motion'
import { useLanguage } from '../../tutorial/LanguageContext'
import SectionHeading from '../../tutorial/ui/SectionHeading'
import TipBox from '../../tutorial/ui/TipBox'
import StepByStep from '../../tutorial/ui/StepByStep'

export default function SessionManagement() {
  const { t } = useLanguage()

  return (
    <section className="mb-16">
      <SectionHeading id="session-management">
        {t('Session Management', '세션 관리')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-6">
        {t(
          'A session in cokacdir is a working context that connects the Telegram bot to a specific directory on your server. The bot remembers conversation history, file changes, and AI context within a session. Understanding how sessions work lets you seamlessly continue your work across multiple conversations.',
          'cokacdir에서 세션은 텔레그램 봇을 서버의 특정 디렉토리에 연결하는 작업 컨텍스트입니다. 봇은 세션 내에서 대화 기록, 파일 변경, AI 컨텍스트를 기억합니다. 세션의 동작 방식을 이해하면 여러 대화에 걸쳐 작업을 자연스럽게 이어갈 수 있습니다.'
        )}
      </p>

      {/* Starting a Session */}
      <SectionHeading id="session-start" level={3}>
        {t('Starting a Session', '세션 시작하기')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'Use the /start command to begin a session. You can specify a directory path, or omit it to create a temporary workspace.',
          '/start 명령어로 세션을 시작합니다. 디렉토리 경로를 지정하거나, 생략하면 임시 작업 공간이 생성됩니다.'
        )}
      </p>

      <div className="space-y-3 mb-6">
        {[
          {
            cmd: '/start /home/user/myproject',
            desc: t('Start a session in the specified directory', '지정된 디렉토리에서 세션 시작'),
          },
          {
            cmd: '/start ~/myproject',
            desc: t('Home directory shorthand (~) is supported', '홈 디렉토리 축약(~) 지원'),
          },
          {
            cmd: '/start',
            desc: t('Create a temporary workspace (random ID)', '임시 작업 공간 생성 (랜덤 ID)'),
          },
        ].map(({ cmd, desc }) => (
          <motion.div
            key={cmd}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-zinc-800 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
          >
            <code className="font-mono text-accent-cyan text-sm whitespace-nowrap">{cmd}</code>
            <span className="text-zinc-500 text-sm">{desc}</span>
          </motion.div>
        ))}
      </div>

      <TipBox variant="tip">
        {t(
          'If the specified directory does not exist, it will be created automatically.',
          '지정된 디렉토리가 존재하지 않으면 자동으로 생성됩니다.'
        )}
      </TipBox>

      {/* Resuming a Session */}
      <SectionHeading id="session-resume" level={3}>
        {t('Resuming a Session', '세션 이어가기')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'When you use /start with a path that already has a previous session, the bot automatically restores it — including conversation history and AI context. You don\'t need any special command to resume.',
          '이전에 세션이 있던 경로로 /start를 실행하면, 봇이 자동으로 대화 기록과 AI 컨텍스트를 포함한 세션을 복원합니다. 이어가기 위한 특별한 명령어는 필요 없습니다.'
        )}
      </p>

      <StepByStep
        steps={[
          {
            title: t('Start with the same path', '같은 경로로 시작'),
            description: t(
              'Use /start with the same directory path you used before. The bot will detect and restore the previous session.',
              '이전에 사용하던 디렉토리 경로로 /start를 실행하세요. 봇이 이전 세션을 감지하고 복원합니다.'
            ),
          },
          {
            title: t('Session restored', '세션 복원됨'),
            description: t(
              'The bot responds with "Session restored" and shows a preview of recent conversation history.',
              '봇이 "Session restored"로 응답하며 최근 대화 기록의 미리보기를 보여줍니다.'
            ),
          },
          {
            title: t('Continue where you left off', '이전 작업 이어가기'),
            description: t(
              'The AI remembers the full conversation context. Just send your next message and continue working.',
              'AI가 전체 대화 컨텍스트를 기억합니다. 다음 메시지를 보내 작업을 이어가면 됩니다.'
            ),
          },
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg p-4 mb-6"
      >
        <p className="text-zinc-500 text-xs font-semibold mb-3">
          {t('Example: resuming a session', '예시: 세션 이어가기')}
        </p>
        <div className="font-mono text-sm space-y-2">
          <p className="text-zinc-500">{t('You:', '나:')}</p>
          <p className="text-accent-cyan">/start ~/myproject</p>
          <p className="text-zinc-500 mt-2">{t('Bot:', '봇:')}</p>
          <div className="text-zinc-400 bg-bg-elevated rounded p-3 text-xs">
            <p>[claude] Session restored at <span className="text-white">`/home/user/myproject`</span>.</p>
            <p className="text-zinc-600 mt-1">...</p>
            <p className="text-zinc-500">user: {t('fix the login bug', '로그인 버그 수정해줘')}</p>
            <p className="text-zinc-500">assistant: {t('I\'ve fixed the login validation...', '로그인 검증을 수정했습니다...')}</p>
          </div>
        </div>
      </motion.div>

      {/* Auto-Restore */}
      <SectionHeading id="session-auto-restore" level={3}>
        {t('Auto-Restore', '자동 복원')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'You don\'t always need to type /start to resume your work. The bot remembers the last active session for each chat and automatically restores it when you send a message.',
          '작업을 이어가기 위해 매번 /start를 입력할 필요는 없습니다. 봇은 각 채팅의 마지막 활성 세션을 기억하고, 메시지를 보내면 자동으로 복원합니다.'
        )}
      </p>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'This is especially useful when the bot server restarts — sessions are persisted to disk and restored on the next message, without any action from you.',
          '이 기능은 봇 서버가 재시작될 때 특히 유용합니다. 세션이 디스크에 저장되어 있어 다음 메시지를 보내면 별도 조치 없이 자동 복원됩니다.'
        )}
      </p>

      <TipBox variant="note">
        {t(
          'Auto-restore uses the last path you were working in. If you want to switch to a different directory, use /start with the new path.',
          '자동 복원은 마지막으로 작업하던 경로를 사용합니다. 다른 디렉토리로 전환하려면 새 경로로 /start를 사용하세요.'
        )}
      </TipBox>

      {/* Workspace Sessions */}
      <SectionHeading id="session-workspace" level={3}>
        {t('Workspace Sessions', '워크스페이스 세션')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'When you use /start without a path, a temporary workspace is created with a random 8-character ID. This workspace is stored in ~/.cokacdir/workspace/ and can be resumed later using the workspace ID as a command.',
          '/start를 경로 없이 실행하면 랜덤 8자리 ID로 임시 워크스페이스가 생성됩니다. 이 워크스페이스는 ~/.cokacdir/workspace/에 저장되며, 나중에 워크스페이스 ID를 명령어로 사용하여 이어갈 수 있습니다.'
        )}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg p-4 mb-4"
      >
        <p className="text-zinc-500 text-xs font-semibold mb-3">
          {t('Example: workspace session', '예시: 워크스페이스 세션')}
        </p>
        <div className="font-mono text-sm space-y-2">
          <p className="text-zinc-500">{t('Create workspace:', '워크스페이스 생성:')}</p>
          <p className="text-accent-cyan">/start</p>
          <p className="text-zinc-400 text-xs">→ [claude] Session started at <span className="text-white">`~/.cokacdir/workspace/a1b2c3d4`</span></p>
          <p className="text-zinc-400 text-xs">→ Use <span className="text-white">/a1b2c3d4</span> to resume this session.</p>
          <p className="text-zinc-500 mt-3">{t('Resume later:', '나중에 이어가기:')}</p>
          <p className="text-accent-cyan">/a1b2c3d4</p>
          <p className="text-zinc-400 text-xs">→ [claude] Session restored at <span className="text-white">`~/.cokacdir/workspace/a1b2c3d4`</span></p>
        </div>
      </motion.div>

      <TipBox variant="tip">
        {t(
          'Use /pwd to check your current session path at any time. If the path is a workspace, it will also show the shortcut command to resume it.',
          '/pwd로 언제든 현재 세션 경로를 확인할 수 있습니다. 경로가 워크스페이스인 경우 이어가기 단축 명령어도 함께 표시됩니다.'
        )}
      </TipBox>

      {/* Session by Name or ID */}
      <SectionHeading id="session-by-name" level={3}>
        {t('Resume by Session Name or ID', '세션 이름 또는 ID로 이어가기')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'You can also resume a session by passing a Claude Code session ID or session name to /start. The bot will look up the session, find its working directory, and restore it.',
          '/start에 Claude Code 세션 ID나 세션 이름을 전달하여 세션을 이어갈 수도 있습니다. 봇이 해당 세션을 조회하고 작업 디렉토리를 찾아 복원합니다.'
        )}
      </p>

      <div className="space-y-3 mb-6">
        {[
          {
            cmd: '/start 01abc-def2-3456-7890',
            desc: t('Resume by session UUID', '세션 UUID로 이어가기'),
          },
          {
            cmd: '/start my-project-name',
            desc: t('Resume by session title (exact match, case-insensitive)', '세션 제목으로 이어가기 (정확 매칭, 대소문자 무시)'),
          },
        ].map(({ cmd, desc }) => (
          <motion.div
            key={cmd}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-zinc-800 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
          >
            <code className="font-mono text-accent-cyan text-sm whitespace-nowrap">{cmd}</code>
            <span className="text-zinc-500 text-sm">{desc}</span>
          </motion.div>
        ))}
      </div>

      <TipBox variant="note">
        {t(
          'If the session belongs to a different provider (e.g., you\'re on Claude but the session was from Codex), the bot will automatically switch providers to restore it.',
          '세션이 다른 provider에 속한 경우 (예: Claude를 사용 중인데 세션이 Codex에서 만들어진 경우) 봇이 자동으로 provider를 전환하여 복원합니다.'
        )}
      </TipBox>

      {/* Clearing a Session */}
      <SectionHeading id="session-clear" level={3}>
        {t('Clearing a Session', '세션 초기화')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'Use /clear to reset the current session. This clears the conversation history and AI context while keeping the same working directory. It\'s useful when you want a fresh start without changing your project path.',
          '/clear로 현재 세션을 초기화할 수 있습니다. 대화 기록과 AI 컨텍스트가 초기화되지만 작업 디렉토리는 유지됩니다. 프로젝트 경로를 바꾸지 않고 새로 시작하고 싶을 때 유용합니다.'
        )}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg p-4 mb-6"
      >
        <div className="font-mono text-sm space-y-2">
          <p className="text-accent-cyan">/clear</p>
          <p className="text-zinc-400 text-xs">→ Session cleared.</p>
          <p className="text-zinc-400 text-xs">→ <span className="text-zinc-500">`/home/user/myproject`</span></p>
        </div>
      </motion.div>

      <TipBox variant="warning">
        {t(
          '/clear permanently erases the conversation history for the current session. The AI will not remember any previous messages after clearing. Use this only when you genuinely need a fresh context.',
          '/clear는 현재 세션의 대화 기록을 영구적으로 삭제합니다. 초기화 후 AI는 이전 메시지를 기억하지 못합니다. 정말로 새로운 컨텍스트가 필요한 경우에만 사용하세요.'
        )}
      </TipBox>

      {/* Checking Session Info */}
      <SectionHeading id="session-info" level={3}>
        {t('Checking Session Info', '세션 정보 확인')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'Several commands help you inspect your current session state:',
          '현재 세션 상태를 확인하는 데 도움이 되는 명령어들입니다:'
        )}
      </p>

      <div className="space-y-3 mb-6">
        {[
          {
            cmd: '/pwd',
            title: t('Current path', '현재 경로'),
            desc: t(
              'Shows the current working directory. For workspaces, also shows the resume shortcut.',
              '현재 작업 디렉토리를 표시합니다. 워크스페이스인 경우 이어가기 단축 명령어도 표시합니다.'
            ),
          },
          {
            cmd: '/session',
            title: t('Session details', '세션 상세 정보'),
            desc: t(
              'Shows the session UUID and the exact command to resume this session from your terminal (e.g., claude --resume <id>).',
              '세션 UUID와 터미널에서 이 세션을 이어가기 위한 정확한 명령어를 보여줍니다 (예: claude --resume <id>).'
            ),
          },
        ].map(({ cmd, title, desc }) => (
          <motion.div
            key={cmd}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-zinc-800 rounded-lg p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <code className="font-mono text-accent-cyan text-sm">{cmd}</code>
              <span className="text-white font-semibold text-sm">{title}</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>

      <TipBox variant="tip">
        {t(
          <>The <code className="text-accent-cyan font-mono bg-bg-elevated px-1 py-0.5 rounded">/session</code> command provides a terminal resume command. This means you can start a session via Telegram and continue it directly in your terminal with Claude Code or Codex CLI — or vice versa.</>,
          <><code className="text-accent-cyan font-mono bg-bg-elevated px-1 py-0.5 rounded">/session</code> 명령어는 터미널 이어가기 명령어를 제공합니다. 텔레그램에서 시작한 세션을 터미널의 Claude Code나 Codex CLI에서 이어가거나, 반대로 터미널에서 시작한 세션을 텔레그램에서 이어갈 수 있습니다.</>
        )}
      </TipBox>

      {/* Session Lifecycle Summary */}
      <SectionHeading id="session-lifecycle" level={3}>
        {t('Session Lifecycle', '세션 생명주기')}
      </SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg p-5 mb-6"
      >
        <div className="space-y-4">
          {[
            {
              icon: '1',
              title: t('Create', '생성'),
              desc: t(
                '/start <path> — starts a new session or restores an existing one for the given path.',
                '/start <경로> — 지정된 경로에 새 세션을 시작하거나 기존 세션을 복원합니다.'
              ),
              color: 'bg-accent-cyan/20 border-accent-cyan/50 text-accent-cyan',
            },
            {
              icon: '2',
              title: t('Work', '작업'),
              desc: t(
                'Send messages, upload files, run shell commands. All activity is recorded in session history.',
                '메시지 전송, 파일 업로드, 셸 명령 실행. 모든 활동이 세션 기록에 저장됩니다.'
              ),
              color: 'bg-accent-green/20 border-accent-green/50 text-accent-green',
            },
            {
              icon: '3',
              title: t('Persist', '저장'),
              desc: t(
                'Session is automatically saved to disk. Survives bot restarts and connection drops.',
                '세션이 자동으로 디스크에 저장됩니다. 봇 재시작이나 연결 끊김에도 유지됩니다.'
              ),
              color: 'bg-accent-purple/20 border-accent-purple/50 text-accent-purple',
            },
            {
              icon: '4',
              title: t('Resume', '재개'),
              desc: t(
                'Auto-restore on next message, or /start with the same path. Full context is preserved.',
                '다음 메시지 시 자동 복원, 또는 같은 경로로 /start. 전체 컨텍스트가 보존됩니다.'
              ),
              color: 'bg-accent-cyan/20 border-accent-cyan/50 text-accent-cyan',
            },
            {
              icon: '5',
              title: t('Clear', '초기화'),
              desc: t(
                '/clear — resets conversation history while keeping the working directory.',
                '/clear — 작업 디렉토리는 유지하면서 대화 기록을 초기화합니다.'
              ),
              color: 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400',
            },
          ].map(({ icon, title, desc, color }) => (
            <div key={icon} className="flex gap-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${color} border flex items-center justify-center font-bold text-sm`}>
                {icon}
              </div>
              <div>
                <h4 className="font-semibold text-white mb-0.5">{title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
