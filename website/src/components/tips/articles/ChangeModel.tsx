import { motion } from 'framer-motion'
import { useLanguage } from '../../tutorial/LanguageContext'
import SectionHeading from '../../tutorial/ui/SectionHeading'
import TipBox from '../../tutorial/ui/TipBox'
import StepByStep from '../../tutorial/ui/StepByStep'

export default function ChangeModel() {
  const { t } = useLanguage()

  return (
    <section className="mb-16">
      <SectionHeading id="change-model">
        {t('Changing AI Model', 'AI 모델 변경하기')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-6">
        {t(
          'cokacdir supports multiple AI providers and models. You can switch between them at any time using the /model command in the Telegram bot. Each provider offers different models optimized for various tasks.',
          'cokacdir은 여러 AI provider와 모델을 지원합니다. 텔레그램 봇에서 /model 명령어를 사용하여 언제든지 모델을 전환할 수 있습니다. 각 provider는 다양한 작업에 최적화된 모델을 제공합니다.'
        )}
      </p>

      {/* Check Current Model */}
      <SectionHeading id="change-model-check" level={3}>
        {t('Check Current Model', '현재 모델 확인')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'To see which model is currently active and what models are available, simply type:',
          '현재 활성화된 모델과 사용 가능한 모델 목록을 보려면 다음을 입력하세요:'
        )}
      </p>

      <div className="bg-bg-card border border-zinc-800 rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-3">
          <code className="font-mono text-accent-cyan text-sm">/model</code>
        </div>
      </div>

      <p className="text-zinc-400 leading-relaxed mb-6">
        {t(
          'This will show the current model name and list all available models grouped by provider (Claude, Codex).',
          '현재 모델 이름과 provider별로 그룹화된 사용 가능한 모델 목록을 보여줍니다.'
        )}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg p-4 mb-6"
      >
        <p className="text-zinc-500 text-xs font-semibold mb-2">
          {t('Example response', '응답 예시')}
        </p>
        <div className="font-mono text-sm space-y-1">
          <p className="text-white">Current model: <span className="text-accent-cyan">claude:sonnet</span></p>
          <p className="text-zinc-500 mt-2">Claude:</p>
          <p className="text-zinc-400">/model claude <span className="text-zinc-600">— default</span></p>
          <p className="text-zinc-400">/model claude:sonnet <span className="text-zinc-600">— Sonnet 4.6</span></p>
          <p className="text-zinc-400">/model claude:opus <span className="text-zinc-600">— Opus 4.6</span></p>
          <p className="text-zinc-400">/model claude:haiku <span className="text-zinc-600">— Haiku 4.5</span></p>
          <p className="text-zinc-500 mt-2">Codex:</p>
          <p className="text-zinc-400">/model codex <span className="text-zinc-600">— default</span></p>
          <p className="text-zinc-400">/model codex:gpt-5.4 <span className="text-zinc-600">— Latest frontier model</span></p>
        </div>
      </motion.div>

      {/* Switch Model */}
      <SectionHeading id="change-model-switch" level={3}>
        {t('Switch Model', '모델 변경')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'To change the AI model, use the /model command with the provider:model format:',
          'AI 모델을 변경하려면 /model 명령어에 provider:model 형식으로 지정합니다:'
        )}
      </p>

      <StepByStep
        steps={[
          {
            title: t('Choose a provider', 'Provider 선택'),
            description: (
              <span>
                {t(
                  <>Decide between <code className="text-accent-cyan font-mono bg-bg-elevated px-1.5 py-0.5 rounded">claude</code> and <code className="text-accent-cyan font-mono bg-bg-elevated px-1.5 py-0.5 rounded">codex</code> based on your needs.</>,
                  <>필요에 따라 <code className="text-accent-cyan font-mono bg-bg-elevated px-1.5 py-0.5 rounded">claude</code> 또는 <code className="text-accent-cyan font-mono bg-bg-elevated px-1.5 py-0.5 rounded">codex</code> 중 선택합니다.</>
                )}
              </span>
            ),
          },
          {
            title: t('Select a model', '모델 선택'),
            description: (
              <span>
                {t(
                  <>Pick a specific model variant, or use just the provider name for the default. For example: <code className="text-accent-cyan font-mono bg-bg-elevated px-1.5 py-0.5 rounded">/model claude:opus</code></>,
                  <>특정 모델을 지정하거나, provider 이름만 입력하면 기본 모델이 사용됩니다. 예: <code className="text-accent-cyan font-mono bg-bg-elevated px-1.5 py-0.5 rounded">/model claude:opus</code></>
                )}
              </span>
            ),
          },
          {
            title: t('Confirm the change', '변경 확인'),
            description: t(
              'The bot will respond with the new model name. The change takes effect immediately for the next message.',
              '봇이 새 모델 이름으로 응답합니다. 다음 메시지부터 즉시 적용됩니다.'
            ),
          },
        ]}
      />

      {/* Available Providers */}
      <SectionHeading id="change-model-providers" level={3}>
        {t('Available Providers', '사용 가능한 Provider')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'cokacdir supports two AI providers. Each offers multiple model tiers for different use cases.',
          'cokacdir은 두 가지 AI provider를 지원합니다. 각각 다양한 용도에 맞는 여러 모델 등급을 제공합니다.'
        )}
      </p>

      {/* Claude */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg p-5 mb-4"
      >
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-cyan" />
          Claude (Anthropic)
        </h4>
        <div className="space-y-2">
          {[
            { cmd: '/model claude', desc: t('Default model', '기본 모델') },
            { cmd: '/model claude:sonnet', desc: 'Sonnet 4.6' },
            { cmd: '/model claude:opus', desc: 'Opus 4.6' },
            { cmd: '/model claude:haiku', desc: 'Haiku 4.5' },
            { cmd: '/model claude:sonnet[1m]', desc: t('Sonnet with 1M context window', 'Sonnet 1M 컨텍스트') },
          ].map(({ cmd, desc }) => (
            <div key={cmd} className="flex items-center justify-between gap-4">
              <code className="font-mono text-accent-cyan text-sm">{cmd}</code>
              <span className="text-zinc-500 text-sm">{desc}</span>
            </div>
          ))}
        </div>
        <TipBox variant="tip">
          {t(
            <>Requires <strong>Claude Code</strong> (Anthropic CLI agent) to be installed on the server, along with the <code className="text-accent-cyan font-mono bg-bg-elevated px-1 py-0.5 rounded">ANTHROPIC_API_KEY</code> environment variable.</>,
            <>서버에 <strong>Claude Code</strong> (Anthropic CLI 에이전트)가 설치되어 있어야 하며, <code className="text-accent-cyan font-mono bg-bg-elevated px-1 py-0.5 rounded">ANTHROPIC_API_KEY</code> 환경 변수도 설정되어 있어야 합니다.</>
          )}
        </TipBox>
      </motion.div>

      {/* Codex */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg p-5 mb-6"
      >
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-green" />
          Codex (OpenAI)
        </h4>
        <div className="space-y-2">
          {[
            { cmd: '/model codex', desc: t('Default model', '기본 모델') },
            { cmd: '/model codex:gpt-5.4', desc: t('Latest frontier model', '최신 프론티어 모델') },
            { cmd: '/model codex:gpt-5.3-codex', desc: t('Codex-optimized', 'Codex 최적화') },
            { cmd: '/model codex:gpt-5.3-codex-spark', desc: t('Ultra-fast', '초고속') },
            { cmd: '/model codex:gpt-5.2-codex', desc: t('Frontier agentic', '프론티어 에이전트') },
            { cmd: '/model codex:gpt-5.2', desc: t('Professional & long-running', '전문 & 장시간 작업') },
            { cmd: '/model codex:gpt-5.1-codex-max', desc: t('Deep & fast reasoning', '깊고 빠른 추론') },
            { cmd: '/model codex:gpt-5.1-codex-mini', desc: t('Cheaper & faster', '저렴하고 빠름') },
          ].map(({ cmd, desc }) => (
            <div key={cmd} className="flex items-center justify-between gap-4">
              <code className="font-mono text-accent-cyan text-sm">{cmd}</code>
              <span className="text-zinc-500 text-sm">{desc}</span>
            </div>
          ))}
        </div>
        <TipBox variant="tip">
          {t(
            <>Requires <strong>Codex CLI</strong> (OpenAI CLI agent) to be installed on the server.</>,
            <>서버에 <strong>Codex CLI</strong> (OpenAI CLI 에이전트)가 설치되어 있어야 합니다.</>
          )}
        </TipBox>
      </motion.div>

      <TipBox variant="warning">
        {t(
          <>Each provider requires its corresponding CLI agent to be installed on the server where the bot is running. Claude models need <strong>Claude Code</strong>, and Codex models need <strong>Codex CLI</strong>. If the agent is not installed, the provider's models will not appear in the <code className="text-yellow-300 font-mono bg-bg-elevated px-1 py-0.5 rounded">/model</code> list and cannot be selected.</>,
          <>각 provider는 봇이 실행되는 서버에 해당 CLI 에이전트가 설치되어 있어야 합니다. Claude 모델은 <strong>Claude Code</strong>, Codex 모델은 <strong>Codex CLI</strong>가 필요합니다. 에이전트가 설치되지 않은 경우 해당 provider의 모델이 <code className="text-yellow-300 font-mono bg-bg-elevated px-1 py-0.5 rounded">/model</code> 목록에 표시되지 않으며 선택할 수 없습니다.</>
        )}
      </TipBox>

      {/* Switching Providers */}
      <SectionHeading id="change-model-provider-switch" level={3}>
        {t('Switching Providers', 'Provider 전환 시 주의')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'When you switch between different providers (e.g., from Claude to Codex), the current session is automatically reset. This is because each provider uses a different conversation format and context.',
          'Provider를 전환하면 (예: Claude에서 Codex로) 현재 세션이 자동으로 초기화됩니다. 각 provider가 서로 다른 대화 형식과 컨텍스트를 사용하기 때문입니다.'
        )}
      </p>

      <TipBox variant="warning">
        {t(
          <>
            Switching providers clears the current session, working directory, and conversation history.
            You will need to use <code className="text-yellow-300 font-mono bg-bg-elevated px-1.5 py-0.5 rounded">/start &lt;path&gt;</code> again after the switch.
            Switching between models within the same provider (e.g., claude:sonnet to claude:opus) does <strong>not</strong> reset the session.
          </>,
          <>
            Provider 전환 시 현재 세션, 작업 디렉토리, 대화 기록이 모두 초기화됩니다.
            전환 후 <code className="text-yellow-300 font-mono bg-bg-elevated px-1.5 py-0.5 rounded">/start &lt;경로&gt;</code>를 다시 실행해야 합니다.
            같은 provider 내에서 모델만 변경하는 경우(예: claude:sonnet에서 claude:opus)에는 세션이 초기화되지 <strong>않습니다</strong>.
          </>
        )}
      </TipBox>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg p-4 my-6"
      >
        <p className="text-zinc-500 text-xs font-semibold mb-3">
          {t('Session behavior comparison', '세션 동작 비교')}
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-accent-green text-lg leading-none mt-0.5">&#10003;</span>
            <div>
              <code className="font-mono text-sm text-zinc-300">claude:sonnet</code>
              <span className="text-zinc-600 mx-2">&rarr;</span>
              <code className="font-mono text-sm text-zinc-300">claude:opus</code>
              <p className="text-zinc-500 text-sm mt-1">{t('Session preserved', '세션 유지')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-accent-green text-lg leading-none mt-0.5">&#10003;</span>
            <div>
              <code className="font-mono text-sm text-zinc-300">codex:gpt-5.4</code>
              <span className="text-zinc-600 mx-2">&rarr;</span>
              <code className="font-mono text-sm text-zinc-300">codex:gpt-5.3-codex</code>
              <p className="text-zinc-500 text-sm mt-1">{t('Session preserved', '세션 유지')}</p>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-3">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-lg leading-none mt-0.5">!</span>
              <div>
                <code className="font-mono text-sm text-zinc-300">claude:sonnet</code>
                <span className="text-zinc-600 mx-2">&rarr;</span>
                <code className="font-mono text-sm text-zinc-300">codex:gpt-5.4</code>
                <p className="text-zinc-500 text-sm mt-1">{t('Session reset (provider change)', '세션 초기화 (provider 변경)')}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Model Selection Tips */}
      <SectionHeading id="change-model-tips" level={3}>
        {t('Model Selection Tips', '모델 선택 팁')}
      </SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        {[
          {
            title: t('Complex tasks', '복잡한 작업'),
            model: 'claude:opus',
            desc: t(
              'Best for multi-step reasoning, large refactors, and architecture decisions.',
              '다단계 추론, 대규모 리팩토링, 아키텍처 결정에 적합합니다.'
            ),
          },
          {
            title: t('Everyday coding', '일상적인 코딩'),
            model: 'claude:sonnet',
            desc: t(
              'Great balance of speed and capability for most development tasks.',
              '대부분의 개발 작업에 속도와 성능의 균형이 좋습니다.'
            ),
          },
          {
            title: t('Quick answers', '빠른 응답'),
            model: 'claude:haiku',
            desc: t(
              'Fastest response time. Good for simple questions and lightweight tasks.',
              '가장 빠른 응답 시간. 간단한 질문과 가벼운 작업에 적합합니다.'
            ),
          },
          {
            title: t('Large context', '큰 컨텍스트'),
            model: 'claude:sonnet[1m]',
            desc: t(
              '1M token context window. Use when dealing with very large files or long conversations.',
              '1M 토큰 컨텍스트. 매우 큰 파일이나 긴 대화를 다룰 때 사용합니다.'
            ),
          },
        ].map(({ title, model, desc }) => (
          <motion.div
            key={model}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-zinc-800 rounded-lg p-4"
          >
            <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
            <code className="font-mono text-accent-cyan text-xs">{model}</code>
            <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>

      <TipBox variant="note">
        {t(
          'Model availability depends on your server configuration. If a provider is not installed, its models will not appear in the /model list.',
          '모델 사용 가능 여부는 서버 설정에 따라 다릅니다. Provider가 설치되지 않은 경우 /model 목록에 해당 모델이 표시되지 않습니다.'
        )}
      </TipBox>
    </section>
  )
}
