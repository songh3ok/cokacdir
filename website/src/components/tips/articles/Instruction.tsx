import { motion } from 'framer-motion'
import { useLanguage } from '../../tutorial/LanguageContext'
import SectionHeading from '../../tutorial/ui/SectionHeading'
import TipBox from '../../tutorial/ui/TipBox'

export default function Instruction() {
  const { t } = useLanguage()

  return (
    <section className="mb-16">
      <SectionHeading id="instruction">
        {t('System Instruction', '시스템 인스트럭션')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-6">
        {t(
          'The /instruction command lets you set a persistent system prompt for the AI in each chat. This shapes how the AI behaves, responds, and approaches tasks — like giving it a permanent role or set of rules.',
          '/instruction 명령어를 사용하면 각 채팅에서 AI에 대한 영구적인 시스템 프롬프트를 설정할 수 있습니다. AI가 어떻게 행동하고, 응답하고, 작업에 접근하는지를 설정합니다 — 영구적인 역할이나 규칙을 부여하는 것과 같습니다.'
        )}
      </p>

      {/* Set Instruction */}
      <SectionHeading id="instruction-set" level={3}>
        {t('Setting an Instruction', '인스트럭션 설정하기')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'To set a system instruction, type /instruction followed by your text:',
          '시스템 인스트럭션을 설정하려면 /instruction 뒤에 텍스트를 입력합니다:'
        )}
      </p>

      <div className="space-y-3 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg-card border border-zinc-800 rounded-lg p-4"
        >
          <code className="font-mono text-accent-cyan text-sm">/instruction You are a senior backend engineer. Always write tests and explain your reasoning.</code>
        </motion.div>
      </div>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'The bot will confirm the instruction has been set. From this point on, every AI response in this chat will follow the instruction.',
          '봇이 인스트럭션 설정을 확인합니다. 이후 이 채팅의 모든 AI 응답이 설정된 인스트럭션을 따릅니다.'
        )}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg p-4 mb-6"
      >
        <p className="text-zinc-500 text-xs font-semibold mb-2">
          {t('Bot response', '봇 응답')}
        </p>
        <div className="font-mono text-sm">
          <p className="text-white">Instruction set:</p>
          <p className="text-zinc-400">You are a senior backend engineer. Always write tests and explain your reasoning.</p>
        </div>
      </motion.div>

      <TipBox variant="tip">
        {t(
          'The instruction is injected into the AI\'s system prompt as "User\'s instruction for this chat". The AI treats it as a persistent directive that applies to all messages.',
          '인스트럭션은 AI의 시스템 프롬프트에 "User\'s instruction for this chat"으로 주입됩니다. AI는 이를 모든 메시지에 적용되는 영구적인 지시로 취급합니다.'
        )}
      </TipBox>

      {/* View Instruction */}
      <SectionHeading id="instruction-view" level={3}>
        {t('Viewing Current Instruction', '현재 인스트럭션 확인')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'To check what instruction is currently set, type /instruction with no arguments:',
          '현재 설정된 인스트럭션을 확인하려면 /instruction만 입력합니다:'
        )}
      </p>

      <div className="bg-bg-card border border-zinc-800 rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-3">
          <code className="font-mono text-accent-cyan text-sm">/instruction</code>
        </div>
      </div>

      <p className="text-zinc-400 leading-relaxed mb-6">
        {t(
          'If no instruction is set, it will show "No instruction set" with usage help.',
          '인스트럭션이 설정되지 않았으면 "No instruction set"과 사용법을 보여줍니다.'
        )}
      </p>

      {/* Clear Instruction */}
      <SectionHeading id="instruction-clear" level={3}>
        {t('Clearing an Instruction', '인스트럭션 삭제')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'To remove the instruction and return the AI to its default behavior:',
          '인스트럭션을 삭제하고 AI를 기본 동작으로 되돌리려면:'
        )}
      </p>

      <div className="bg-bg-card border border-zinc-800 rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-3">
          <code className="font-mono text-accent-cyan text-sm">/instruction_clear</code>
        </div>
      </div>

      {/* Persistence */}
      <SectionHeading id="instruction-persistence" level={3}>
        {t('Persistence', '영속성')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'Instructions are saved to bot_settings.json and persist across bot restarts, server reboots, and session changes. Each chat (identified by chat_id) has its own independent instruction.',
          '인스트럭션은 bot_settings.json에 저장되며 봇 재시작, 서버 재부팅, 세션 변경에도 유지됩니다. 각 채팅(chat_id 기준)은 독립적인 인스트럭션을 가집니다.'
        )}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg p-5 mb-6"
      >
        <p className="text-zinc-500 text-xs font-semibold mb-3">
          {t('Instruction lifecycle', '인스트럭션 생명주기')}
        </p>
        <div className="space-y-3">
          {[
            {
              icon: '1',
              title: t('Set once', '한 번 설정'),
              desc: t('Set with /instruction — no need to repeat every session.', '/instruction으로 설정 — 매 세션마다 반복할 필요 없습니다.'),
            },
            {
              icon: '2',
              title: t('Always active', '항상 활성'),
              desc: t('Applies to every AI request in this chat, including scheduled tasks.', '예약 작업을 포함해 이 채팅의 모든 AI 요청에 적용됩니다.'),
            },
            {
              icon: '3',
              title: t('Survives restarts', '재시작에도 유지'),
              desc: t('Stored in bot_settings.json — persists across reboots and updates.', 'bot_settings.json에 저장 — 재부팅과 업데이트에도 유지됩니다.'),
            },
            {
              icon: '4',
              title: t('Override anytime', '언제든 변경'),
              desc: t('Run /instruction with new text to replace, or /instruction_clear to remove.', '새 텍스트로 /instruction을 실행하면 교체, /instruction_clear로 삭제합니다.'),
            },
          ].map(({ icon, title, desc }) => (
            <div key={icon} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-purple/20 border border-accent-purple/50 flex items-center justify-center text-accent-purple font-bold text-sm">
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

      {/* Use Cases */}
      <SectionHeading id="instruction-examples" level={3}>
        {t('Example Use Cases', '활용 예시')}
      </SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        {[
          {
            title: t('Role assignment', '역할 부여'),
            instruction: 'You are a React/TypeScript specialist. Focus on component architecture and performance.',
            desc: t('Give the AI a specific expertise area.', 'AI에 특정 전문 분야를 부여합니다.'),
          },
          {
            title: t('Language preference', '언어 설정'),
            instruction: '항상 한국어로 대답하세요.',
            desc: t('Force responses in a specific language.', '특정 언어로 응답하도록 강제합니다.'),
          },
          {
            title: t('Coding style', '코딩 스타일'),
            instruction: 'Always add error handling. Use early returns. Write unit tests for every function.',
            desc: t('Enforce coding conventions.', '코딩 규칙을 적용합니다.'),
          },
          {
            title: t('Safety rules', '안전 규칙'),
            instruction: 'Never run rm -rf. Always ask before deleting files. Create backups before modifying.',
            desc: t('Set safety boundaries.', '안전 경계를 설정합니다.'),
          },
        ].map(({ title, instruction, desc }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-zinc-800 rounded-lg p-4"
          >
            <h4 className="text-white font-semibold text-sm mb-2">{title}</h4>
            <code className="font-mono text-accent-cyan text-xs leading-relaxed block mb-2">{instruction}</code>
            <p className="text-zinc-500 text-sm">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Group Chat */}
      <SectionHeading id="instruction-group" level={3}>
        {t('Instructions in Group Chats', '그룹 채팅에서의 인스트럭션')}
      </SectionHeading>

      <p className="text-zinc-400 leading-relaxed mb-4">
        {t(
          'In group chats with multiple bots, each bot has its own instruction. Use @botname to set instructions for a specific bot:',
          '여러 봇이 있는 그룹 채팅에서 각 봇은 자체 인스트럭션을 가집니다. @봇이름으로 특정 봇의 인스트럭션을 설정합니다:'
        )}
      </p>

      <div className="space-y-3 mb-6">
        {[
          {
            cmd: '/instruction@frontend_bot You are a React specialist.',
            desc: t('Set instruction for frontend_bot only', 'frontend_bot에만 인스트럭션 설정'),
          },
          {
            cmd: '/instruction@backend_bot You are a Rust backend engineer.',
            desc: t('Set instruction for backend_bot only', 'backend_bot에만 인스트럭션 설정'),
          },
        ].map(({ cmd, desc }) => (
          <motion.div
            key={cmd}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-zinc-800 rounded-lg p-4"
          >
            <code className="font-mono text-accent-cyan text-xs sm:text-sm block mb-1">{cmd}</code>
            <span className="text-zinc-500 text-sm">{desc}</span>
          </motion.div>
        ))}
      </div>

      <TipBox variant="tip">
        {t(
          'Combining /instruction with different /model and /start paths per bot lets you create specialized teams — e.g., a frontend bot, backend bot, and DevOps bot each with its own role, model, and working directory.',
          '/instruction을 봇별 다른 /model, /start 경로와 결합하면 전문 팀을 만들 수 있습니다 — 예: 프론트엔드 봇, 백엔드 봇, DevOps 봇 각각에 고유한 역할, 모델, 작업 디렉토리를 부여합니다.'
        )}
      </TipBox>

      {/* Quick Reference */}
      <SectionHeading id="instruction-reference" level={3}>
        {t('Quick Reference', '빠른 참조')}
      </SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-bg-card border border-zinc-800 rounded-lg overflow-hidden mb-6"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-zinc-500 font-semibold px-4 py-3">{t('Command', '명령어')}</th>
              <th className="text-left text-zinc-500 font-semibold px-4 py-3">{t('Description', '설명')}</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              { cmd: '/instruction <text>', desc: t('Set system instruction', '시스템 인스트럭션 설정') },
              { cmd: '/instruction', desc: t('View current instruction', '현재 인스트럭션 확인') },
              { cmd: '/instruction_clear', desc: t('Remove instruction', '인스트럭션 삭제') },
              { cmd: '/instruction@bot <text>', desc: t('Set instruction for specific bot (group)', '특정 봇에 인스트럭션 설정 (그룹)') },
            ].map(({ cmd, desc }, i) => (
              <tr key={i} className={i < 3 ? 'border-b border-zinc-800/50' : ''}>
                <td className="px-4 py-2.5"><code className="font-mono text-accent-cyan text-xs">{cmd}</code></td>
                <td className="px-4 py-2.5">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <TipBox variant="note">
        {t(
          'Instructions are per-chat, not per-session. Starting a new session with /start does not clear the instruction. Only /instruction_clear or setting a new instruction changes it.',
          '인스트럭션은 세션별이 아닌 채팅별입니다. /start로 새 세션을 시작해도 인스트럭션은 유지됩니다. /instruction_clear 또는 새 인스트럭션 설정만이 이를 변경합니다.'
        )}
      </TipBox>
    </section>
  )
}
